import Link from "next/link";
import { BookOpenCheck, History, Repeat2, Sparkles, Star, Timer } from "lucide-react";
import { LinkCardGrid, type LinkCardItem } from "@/components/layout/link-card-grid";
import { StatsGrid } from "@/components/exam/stats-grid";
import { PageShell } from "@/components/layout/page-shell";

const actions: LinkCardItem[] = [
  { title: "Тренировка", href: "/practice", icon: BookOpenCheck, description: "Отработка конкретных номеров заданий с мгновенной проверкой." },
  { title: "Полный экзамен", href: "/exam", icon: Timer, description: "Запуск симуляции с таймером и итоговым анализом." },
  { title: "Повторить ошибки", href: "/mistakes", icon: Repeat2, description: "Очередь заданий, где чаще всего возникают ошибки." },
  { title: "Рекомендации", href: "/recommendations", icon: Sparkles, description: "Персональный план подготовки по слабым темам." },
  { title: "Избранное", href: "/favorites", icon: Star, description: "Сохраненные задания и правила для повторения." },
  { title: "История", href: "/history", icon: History, description: "Все попытки, даты, баллы и завершенные экзамены." }
];

export default function DashboardPage() {
  return (
    <PageShell title="Личный кабинет" description="Ваш маршрут подготовки, прогресс и быстрые действия.">
      <StatsGrid
        items={[
          { label: "Средний результат", value: "78%", hint: "+12% за неделю" },
          { label: "Streak", value: "6 дней", hint: "занимайтесь ежедневно" },
          { label: "Ошибки к повтору", value: "14", hint: "приоритетная очередь" },
          { label: "Место в рейтинге", value: "#8", hint: "среди класса" }
        ]}
      />
      <div className="mt-8">
        <LinkCardGrid items={actions} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Нужен групповой режим? <Link href="/lobby" className="font-medium text-primary">Создайте лобби для класса</Link>.
      </p>
    </PageShell>
  );
}
