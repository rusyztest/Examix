import Link from "next/link";
import { ClipboardCheck, FileText, Users } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminSections = [
  { href: "/admin/tasks", title: "Задания", text: "Создание и редактирование заданий, ответов и объяснений.", icon: ClipboardCheck },
  { href: "/admin/texts", title: "Тексты", text: "Управление текстами, авторами, темами и сложностью.", icon: FileText },
  { href: "/profile", title: "Пользователи", text: "Профили, роли student/teacher/admin и модерация.", icon: Users }
];

export default function AdminPage() {
  return (
    <PageShell title="Админ-панель" description="Управление заданиями, текстами, ответами, пользователями и модерацией контента.">
      <div className="grid gap-4 md:grid-cols-3">
        {adminSections.map((section) => (
          <Card key={section.href} className="animate-fade-up">
            <CardHeader><section.icon className="h-6 w-6 text-primary" /><CardTitle>{section.title}</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{section.text}</p>
              <Button asChild><Link href={section.href}>Открыть</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
