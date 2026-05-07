import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendations = [
  ["Пунктуация в сложном предложении", "20 минут", "/practice/5"],
  ["Средства связи предложений", "15 минут", "/practice/12"],
  ["Безударные гласные", "10 минут", "/practice/1"]
];

export default function RecommendationsPage() {
  return (
    <PageShell title="Рекомендации" description="Персональный план подготовки на основе ошибок, истории и слабых тем.">
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map(([topic, time, href]) => (
          <Card key={topic} className="animate-fade-up">
            <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />{topic}</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Рекомендуемое время: {time}. После подключения попыток план будет считаться автоматически.</p>
              <Button asChild><Link href={href}>Начать</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
