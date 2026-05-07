import Link from "next/link";
import { Users, Timer, Trophy } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teacherTools = [
  { title: "Создать лобби", text: "Настройте режим, время, номера заданий и отправьте код классу.", href: "/lobby", icon: Users },
  { title: "Запустить экзамен", text: "Проведите синхронную симуляцию полного экзамена для учеников.", href: "/exam", icon: Timer },
  { title: "Рейтинг класса", text: "Посмотрите результаты, баллы и завершение участников.", href: "/leaderboard", icon: Trophy }
];

export default function TeacherPage() {
  return (
    <PageShell title="Кабинет учителя" description="Инструменты для урока, консультации и групповой экзаменационной практики.">
      <div className="grid gap-4 md:grid-cols-3">
        {teacherTools.map((tool) => (
          <Card key={tool.href} className="animate-fade-up">
            <CardHeader><tool.icon className="h-6 w-6 text-primary" /><CardTitle>{tool.title}</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{tool.text}</p>
              <Button asChild><Link href={tool.href}>Открыть</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
