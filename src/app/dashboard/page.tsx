import Link from "next/link";
import { StatsGrid } from "@/components/exam/stats-grid";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return <PageShell title="Личный кабинет" description="Ваш маршрут подготовки, прогресс и быстрые действия."><StatsGrid items={[{label:"Средний результат",value:"78%",hint:"+12% за неделю"},{label:"Streak",value:"6 дней",hint:"занимайтесь ежедневно"},{label:"Ошибки к повтору",value:"14",hint:"приоритетная очередь"},{label:"Место в рейтинге",value:"#8",hint:"среди класса"}]} /><div className="mt-6 grid gap-4 md:grid-cols-3">{[["Тренировка","/practice"],["Полный экзамен","/exam"],["История","/history"]].map(([title,href])=><Card key={href}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><Button asChild className="w-full"><Link href={href}>Открыть</Link></Button></CardContent></Card>)}</div></PageShell>;
}
