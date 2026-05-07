import Link from "next/link";
import { notFound } from "next/navigation";
import { TaskCard } from "@/components/exam/task-card";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";

export default async function TaskPracticePage({ params }: { params: Promise<{ taskNumber: string }> }) {
  const { taskNumber } = await params;
  const number = Number(taskNumber);

  if (!Number.isFinite(number)) {
    notFound();
  }

  const tasks = await getTaskBank({ taskNumber: number });

  return (
    <PageShell title={`Тренировка задания ${number}`} description="Страница готова брать задания из Supabase; при пустой базе показывает демо-набор.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link href="/practice">Все задания</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/mistakes">Повторить ошибки</Link>
        </Button>
      </div>
      <div className="grid gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </PageShell>
  );
}
