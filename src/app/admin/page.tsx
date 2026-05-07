import { PageShell } from "@/components/layout/page-shell";
import { demoTasks } from "@/lib/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return <PageShell title="Админ-панель" description="Управление заданиями, текстами, ответами, пользователями и модерацией контента."><Card><CardHeader><CardTitle>Банк заданий</CardTitle></CardHeader><CardContent className="space-y-3">{demoTasks.map((task)=><div key={task.id} className="flex items-center justify-between rounded-xl border p-4"><span>№{task.task_number} · {task.topic}</span><Button variant="outline">Редактировать</Button></div>)}</CardContent></Card></PageShell>;
}
