import { FileText } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { getTaskBank } from "@/lib/data/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TextsPage() {
  const tasks = await getTaskBank();
  const texts = tasks.map((task) => task.texts).filter(Boolean);

  return (
    <PageShell title="Банк текстов" description="Тексты для заданий по фрагментам, темам и сложности.">
      <div className="grid gap-4 md:grid-cols-2">
        {texts.length ? texts.map((text) => (
          <Card key={text!.id} className="animate-fade-up">
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />{text!.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{text!.content}</p>
              <p>Тема: {text!.theme} · Сложность: {text!.difficulty}</p>
            </CardContent>
          </Card>
        )) : (
          <Card><CardContent className="pt-6 text-sm text-muted-foreground">Добавьте тексты в Supabase-таблицу `texts`, и они появятся здесь.</CardContent></Card>
        )}
      </div>
    </PageShell>
  );
}
