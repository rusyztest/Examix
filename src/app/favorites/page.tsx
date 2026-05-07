import Link from "next/link";
import { Star } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function FavoritesPage() {
  const tasks = await getTaskBank({ limit: 6 });

  return (
    <PageShell title="Избранные задания" description="Закладки для сложных правил и текстов. Сейчас показан стартовый набор, готовый к замене пользовательскими избранными.">
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id} className="animate-fade-up">
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-center gap-2 font-semibold"><Star className="h-4 w-4 text-primary" />Задание {task.task_number}</div>
              <p className="text-sm text-muted-foreground">{task.topic}</p>
              <Button variant="outline" asChild><Link href={`/practice/${task.task_number}`}>Тренировать</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
