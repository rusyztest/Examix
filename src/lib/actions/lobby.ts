"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createLobbyCode } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const lobbySchema = z.object({
  mode: z.enum(["practice", "exam"]),
  questionCount: z.coerce.number().min(1).max(40),
  timeLimit: z.coerce.number().min(5).max(240),
  taskNumbers: z.string().default(""),
  randomOrder: z.coerce.boolean().default(true),
  resultsVisibility: z.enum(["host", "all"]).default("all")
});

const CYRILLIC_TO_LATIN: Record<string, string> = { А: "A", В: "B", С: "C", Е: "E", Н: "H", К: "K", М: "M", О: "O", Р: "P", Т: "T", Х: "X", У: "Y" };

function normalizeJoinCode(value: string) {
  return String(value)
    .trim()
    .toUpperCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");
}

const joinCodeSchema = z.string().transform(normalizeJoinCode).min(4).max(10).regex(/^[A-Z0-9]+$/, "Код должен содержать только буквы и цифры");

export async function createLobby(formData: FormData) {
  const parsed = lobbySchema.parse(Object.fromEntries(formData));
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Необходимо войти" };

  const settings = {
    questionCount: parsed.questionCount,
    timeLimit: parsed.timeLimit * 60,
    taskNumbers: parsed.taskNumbers.split(",").map((item) => Number(item.trim())).filter(Boolean),
    randomOrder: parsed.randomOrder,
    privateByCode: true,
    resultsVisibility: parsed.resultsVisibility
  };

  let data: { code: string } | null = null;
  let error: { message: string } | null = null;

  for (let i = 0; i < 5; i += 1) {
    const response = await supabase
      .from("lobbies")
      .insert({ code: createLobbyCode(), host_id: userData.user.id, mode: parsed.mode, settings, started: false })
      .select("code")
      .single<{ code: string }>();

    data = response.data;
    error = response.error;
    if (!error || !error.message.toLowerCase().includes("duplicate")) break;
  }

  if (error || !data) return { error: error?.message ?? "Комната не создана" };
  redirect(`/lobby/${data.code}`);
}

export async function joinLobby(code: string) {
  const parsedCode = joinCodeSchema.parse(code);
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Необходимо войти" };
  const { data: lobby, error: lobbyError } = await supabase.from("lobbies").select("id").eq("code", parsedCode).single<{ id: string }>();
  if (lobbyError || !lobby) return { error: "Лобби не найдено" };
  const { error } = await supabase.from("lobby_members").upsert({ lobby_id: lobby.id, user_id: userData.user.id }, { onConflict: "lobby_id,user_id" });
  if (error) return { error: error.message };
  redirect(`/lobby/${parsedCode}`);
}

export async function joinLobbyFromForm(formData: FormData) {
  const code = joinCodeSchema.parse(formData.get("code"));
  return joinLobby(code);
}

export async function startLobby(lobbyId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lobbies").update({ started: true }).eq("id", lobbyId);
  return error ? { error: error.message } : { ok: true };
}
