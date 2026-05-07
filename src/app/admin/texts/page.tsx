import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminTextsPage() {
  return (
    <PageShell title="Управление текстами" description="Раздел для наполнения таблицы texts и связи текстов с заданиями.">
      <Card>
        <CardContent className="space-y-4 pt-6 text-sm text-muted-foreground">
          <p>Добавляйте тексты в Supabase-таблицу `texts`, затем указывайте `text_id` у заданий в `tasks`.</p>
          <Button asChild><Link href="/texts">Посмотреть банк текстов</Link></Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
