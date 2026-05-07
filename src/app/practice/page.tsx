import Link from "next/link";
import { TaskCard } from "@/components/exam/task-card";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const taskNumbers = [1, 5, 12];

export default async function PracticePage() {
  const tasks = await getTaskBank({ limit: 12 });

  return (
    <PageShell title="Режим тренировки" description="Отрабатывайте конкретные типы заданий, получайте мгновенную проверку и объяснения.">
      <Card className="mb-6 animate-fade-up">
        <CardContent className="grid gap-3 pt-6 md:grid-cols-5">
          {taskNumbers.map((number) => (
            <Button key={number} variant="outline" asChild>
              <Link href={`/practice/${number}`}>Задание {number}</Link>
            </Button>
          ))}
          <Button asChild>
            <Link href="/mistakes">Повторить ошибки</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/favorites">Избранное</Link>
          </Button>
        </CardContent>
      </Card>
      <div className="grid gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </PageShell>
  );
}
