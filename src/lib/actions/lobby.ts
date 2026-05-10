"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createLobbyCode } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const lobbySchema = z.object({
  mode: z.enum(["practice", "exam"]),
  participantLimit: z.coerce.number().min(2).max(80),
  timeLimit: z.coerce.number().min(5).max(240),
  taskPreset: z.enum(["all", "a", "b"]).default("all"),
  randomOrder: z.coerce.boolean().default(true),
  resultsVisibility: z.enum(["host", "all"]).default("all")
});

export async function createLobby(formData: FormData) {
  const parsed = lobbySchema.parse(Object.fromEntries(formData));
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Необходимо войти" };

  const presetTaskNumbers = parsed.taskPreset === "a"
    ? Array.from({ length: 18 }, (_, i) => i + 1)
    : parsed.taskPreset === "b"
      ? Array.from({ length: 22 }, (_, i) => i + 19)
      : Array.from({ length: 40 }, (_, i) => i + 1);

  const settings = {
    questionCount: presetTaskNumbers.length,
    timeLimit: parsed.timeLimit * 60,
    taskNumbers: presetTaskNumbers,
    participantLimit: parsed.participantLimit,
    taskPreset: parsed.taskPreset,
    randomOrder: parsed.randomOrder,
    privateByCode: true,
    resultsVisibility: parsed.resultsVisibility
  };

  const { data, error } = await supabase
    .from("lobbies")
    .insert({ code: createLobbyCode(), host_id: userData.user.id, mode: parsed.mode, settings, started: false })
    .select("code")
    .single<{ code: string }>();

  if (error || !data) return { error: error?.message ?? "Комната не создана" };
  redirect(`/lobby/${data.code}`);
}

export async function joinLobby(code: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Необходимо войти" };
  const { data: lobby, error: lobbyError } = await supabase.from("lobbies").select("id").eq("code", code.toUpperCase()).single<{ id: string }>();
  if (lobbyError || !lobby) return { error: "Лобби не найдено" };
  const { error } = await supabase.from("lobby_members").upsert({ lobby_id: lobby.id, user_id: userData.user.id }, { onConflict: "lobby_id,user_id" });
  if (error) return { error: error.message };
  redirect(`/lobby/${code.toUpperCase()}`);
}

export async function joinLobbyFromForm(formData: FormData) {
  const code = z.string().min(4).max(12).parse(formData.get("code"));
  const nickname = z.string().min(2).max(32).parse(formData.get("nickname"));
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (userData.user) {
    await supabase.from("profiles").update({ username: nickname }).eq("id", userData.user.id);
  }
  return joinLobby(code);
}

export async function startLobby(lobbyId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lobbies").update({ started: true }).eq("id", lobbyId);
  return error ? { error: error.message } : { ok: true };
}
