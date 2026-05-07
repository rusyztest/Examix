import Link from "next/link";
import { TaskCard } from "@/components/exam/task-card";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function A1PracticePage() {
  const tasks = await getTaskBank({ taskNumber: 1 });

  return (
    <PageShell
      title="А1 — буквы А/О на месте пропуска"
      description="Выберите все номера слов, где пишется буква А. Правильных ответов может быть от 2 до 4."
    >
      <Card className="mb-6 animate-fade-up">
        <CardContent className="space-y-3 pt-6 text-sm text-muted-foreground">
          <p>
            В ответ можно вводить номера через запятую, пробел или подряд: например, <b>2,3,4</b>, <b>2 3 4</b> или <b>234</b>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild><Link href="/practice">Все тренировки</Link></Button>
            <Button variant="outline" asChild><Link href="/recommendations">Рекомендации</Link></Button>
          </div>
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
