"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function signIn(formData: FormData) {
  const parsed = credentialsSchema.parse(Object.fromEntries(formData));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed);
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const parsed = credentialsSchema.parse(Object.fromEntries(formData));
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(parsed);
  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
