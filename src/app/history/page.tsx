import { PageShell } from "@/components/layout/page-shell";
import { demoAttempts } from "@/lib/data/mock";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  return <PageShell title="История попыток" description="Все тренировки и экзамены сохраняются для анализа прогресса."><Card><CardContent className="pt-6"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted-foreground"><tr><th className="p-3">Дата</th><th className="p-3">Режим</th><th className="p-3">Баллы</th><th className="p-3">Статус</th></tr></thead><tbody>{demoAttempts.map((attempt)=><tr key={attempt.id} className="border-t"><td className="p-3">{new Date(attempt.created_at).toLocaleDateString("ru-BY")}</td><td className="p-3">{attempt.mode}</td><td className="p-3">{attempt.score}</td><td className="p-3">завершено</td></tr>)}</tbody></table></div></CardContent></Card></PageShell>;
}
