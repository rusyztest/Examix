import Link from "next/link";
import { ExamRunner } from "@/components/exam/exam-runner";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { selectExamTasks } from "@/lib/exam";
import { Button } from "@/components/ui/button";

export default async function ExamPage() {
  const taskBank = await getTaskBank();
  const structuredTasks = selectExamTasks(taskBank, { mode: "exam" });
  const tasks = structuredTasks.length ? structuredTasks : taskBank.slice(0, 12);

  return (
    <PageShell title="Полный экзамен" description="Случайный вариант, таймер, итоговый балл и анализ ошибок по структуре экзамена.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link href="/results">Посмотреть пример результата</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/history">История попыток</Link>
        </Button>
      </div>
      <ExamRunner tasks={tasks} seconds={90 * 60} />
    </PageShell>
  );
}
