import { PageShell } from "@/components/layout/page-shell";
import { StatsGrid } from "@/components/exam/stats-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  return <PageShell title="Результаты попытки" description="Итоговый балл, процент правильных ответов, ошибки и статистика по разделам."><StatsGrid items={[{label:"Балл",value:"9/12",hint:"75% правильных"},{label:"Часть А",value:"7/8",hint:"сильный раздел"},{label:"Текст",value:"1/2",hint:"нужно повторить"},{label:"Часть Б",value:"1/2",hint:"средства связи"}]} /><Card className="mt-6"><CardHeader><CardTitle>Рекомендации</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>Повторите пунктуацию в сложном предложении и средства связи предложений.</p><p>Добавлены 2 задания в очередь «Повторение ошибок».</p></CardContent></Card></PageShell>;
}
