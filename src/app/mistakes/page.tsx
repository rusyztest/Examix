import Link from "next/link";
import { Repeat2 } from "lucide-react";
import { TaskCard } from "@/components/exam/task-card";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function MistakesPage() {
  const tasks = await getTaskBank({ limit: 3 });

  return (
    <PageShell title="Повторение ошибок" description="Очередь заданий для повторения. После подключения реальных попыток здесь будут только ошибки пользователя.">
      <Card className="mb-6 animate-fade-up">
        <CardContent className="flex flex-col gap-3 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2"><Repeat2 className="h-4 w-4 text-primary" />Сегодня рекомендуется повторить {tasks.length} задания.</span>
          <Button asChild><Link href="/recommendations">Открыть рекомендации</Link></Button>
        </CardContent>
      </Card>
      <div className="grid gap-5">{tasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>
    </PageShell>
  );
}
