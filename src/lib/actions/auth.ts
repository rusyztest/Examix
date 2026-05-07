"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const guestSchema = z.object({
  username: z.string().trim().min(2, "Введите имя минимум из 2 символов").max(40)
});

export async function continueAsGuest(formData: FormData) {
  const parsed = guestSchema.parse(Object.fromEntries(formData));
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error || !data.user) {
    return { error: error?.message ?? "Не удалось создать гостевую сессию" };
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: data.user.id,
    username: parsed.username,
    avatar: null,
    role: "student"
  });

  if (profileError) {
    return { error: profileError.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
