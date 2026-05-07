import { TaskCard } from "@/components/exam/task-card";
import { PageShell } from "@/components/layout/page-shell";
import { demoTasks } from "@/lib/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PracticePage() {
  return <PageShell title="Режим тренировки" description="Отрабатывайте конкретные типы заданий, получайте мгновенную проверку и объяснения."><Card className="mb-6"><CardContent className="grid gap-3 pt-6 md:grid-cols-4"><Button variant="outline">Задание 1</Button><Button variant="outline">Задание 5</Button><Button variant="outline">Задание 12</Button><Button>Повторить ошибки</Button></CardContent></Card><div className="grid gap-5">{demoTasks.map((task)=><TaskCard key={task.id} task={task} />)}</div></PageShell>;
}
