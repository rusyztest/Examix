"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { checkAnswer } from "@/lib/exam";
import type { Task } from "@/types/database";

const answerSchema = z.object({
  attemptId: z.string().uuid(),
  taskId: z.string().uuid(),
  userAnswer: z.string().min(1),
  timeSpent: z.coerce.number().nonnegative()
});

export async function saveAnswer(input: z.infer<typeof answerSchema>) {
  const data = answerSchema.parse(input);
  const supabase = await createClient();
  const { data: task, error: taskError } = await supabase.from("tasks").select("*, answers(*)").eq("id", data.taskId).single<Task>();
  if (taskError || !task) return { error: taskError?.message ?? "Задание не найдено" };

  const checked = checkAnswer(task, data.userAnswer);
  const { error } = await supabase.from("attempt_answers").upsert({
    attempt_id: data.attemptId,
    task_id: data.taskId,
    user_answer: data.userAnswer,
    correct: checked.correct,
    time_spent: data.timeSpent
  });
  if (error) return { error: error.message };
  revalidatePath("/results");
  return checked;
}

export async function finishAttempt(attemptId: string) {
  const supabase = await createClient();
  const { data: answers, error: answersError } = await supabase.from("attempt_answers").select("correct").eq("attempt_id", attemptId);
  if (answersError) return { error: answersError.message };
  const score = answers?.filter((answer) => answer.correct).length ?? 0;
  const { error } = await supabase.from("attempts").update({ score, completed_at: new Date().toISOString() }).eq("id", attemptId);
  if (error) return { error: error.message };
  revalidatePath("/history");
  return { score };
}
