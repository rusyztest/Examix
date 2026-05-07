import { createClient } from "@/lib/supabase/server";
import { demoTasks } from "@/lib/data/mock";
import type { Task, TaskDifficulty } from "@/types/database";

export interface TaskFilters {
  taskNumber?: number;
  difficulty?: TaskDifficulty;
  limit?: number;
}

export async function getTaskBank(filters: TaskFilters = {}): Promise<Task[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("tasks")
      .select("*, answers(*), texts(*)")
      .order("task_number", { ascending: true });

    if (filters.taskNumber) {
      query = query.eq("task_number", filters.taskNumber);
    }

    if (filters.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error || !data?.length) {
      return filterDemoTasks(filters);
    }

    return data as Task[];
  } catch {
    return filterDemoTasks(filters);
  }
}

function filterDemoTasks(filters: TaskFilters) {
  return demoTasks
    .filter((task) => !filters.taskNumber || task.task_number === filters.taskNumber)
    .filter((task) => !filters.difficulty || task.difficulty === filters.difficulty)
    .slice(0, filters.limit ?? demoTasks.length);
}
