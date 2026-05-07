import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminTasksPage() {
  const tasks = await getTaskBank();

  return (
    <PageShell title="Управление заданиями" description="Список заданий из Supabase. Формы создания можно подключить к этой странице следующей итерацией.">
      <Card>
        <CardHeader><CardTitle>Банк заданий</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
              <span>№{task.task_number} · {task.topic} · {task.difficulty}</span>
              <Button variant="outline" asChild><Link href={`/practice/${task.task_number}`}>Проверить</Link></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
