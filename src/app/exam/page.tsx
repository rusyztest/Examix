import { ExamRunner } from "@/components/exam/exam-runner";
import { PageShell } from "@/components/layout/page-shell";
import { demoTasks } from "@/lib/data/mock";

export default function ExamPage() {
  return <PageShell title="Полный экзамен" description="Случайный вариант, таймер, итоговый балл и анализ ошибок по структуре экзамена."><ExamRunner tasks={demoTasks} seconds={90*60} /></PageShell>;
}
