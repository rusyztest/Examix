import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  History,
  Repeat2,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users
} from "lucide-react";
import { LinkCardGrid, type LinkCardItem } from "@/components/layout/link-card-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const primaryFlows: LinkCardItem[] = [
  {
    href: "/practice/a1",
    icon: BookOpenCheck,
    title: "А1 тренировка",
    description: "Выбор номера задания, сложности и количества вопросов с мгновенной проверкой."
  },
  {
    href: "/exam",
    icon: Timer,
    title: "Полный экзамен",
    description: "Симуляция варианта с таймером, итоговым баллом и разбором ошибок."
  },
  {
    href: "/lobby",
    icon: Users,
    title: "Групповое лобби",
    description: "Комната по коду, синхронный старт, realtime-участники и рейтинг класса."
  },
  {
    href: "/dashboard",
    icon: BarChart3,
    title: "Dashboard",
    description: "Прогресс, streak, слабые темы, быстрые действия и рекомендации."
  },
  {
    href: "/teacher",
    icon: GraduationCap,
    title: "Кабинет учителя",
    description: "Запуск экзамена для класса, настройки комнаты и просмотр результатов учеников."
  },
  {
    href: "/admin",
    icon: ClipboardCheck,
    title: "Админ-панель",
    description: "Управление заданиями, текстами, ответами, пользователями и контентом."
  }
];

const learningTools: LinkCardItem[] = [
  { href: "/mistakes", icon: Repeat2, title: "Повторение ошибок", description: "Автоматическая очередь заданий, где пользователь ошибался раньше." },
  { href: "/favorites", icon: Star, title: "Избранные задания", description: "Закладки для сложных правил, текстов и заданий перед экзаменом." },
  { href: "/recommendations", icon: Sparkles, title: "Рекомендации", description: "Слабые темы и персональный план подготовки на ближайшую неделю." },
  { href: "/history", icon: History, title: "История попыток", description: "Все тренировки и экзамены с датами, баллами и статусами." },
  { href: "/leaderboard", icon: Trophy, title: "Рейтинг", description: "Соревнование учеников по экзаменам и групповым комнатам." },
  { href: "/texts", icon: FileText, title: "Банк текстов", description: "Тексты для заданий, темы, авторы и сложность фрагментов." }
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="hero-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        <div className="container relative grid gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div className="flex flex-col justify-center">
            <span className="animate-fade-up w-fit rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
              Беларусь · русский язык · 11 класс · без регистрации по почте
            </span>
            <h1 className="mt-6 animate-fade-up text-4xl font-bold tracking-tight animation-delay-150 md:text-7xl">
              Готовая платформа для подготовки к выпускному экзамену
            </h1>
            <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-8 text-muted-foreground animation-delay-300">
              Examix объединяет тренировки, полный экзамен, разбор ошибок, прогресс, избранное, рекомендации и групповые
              занятия через Supabase Realtime. Как только вы добавите задания в базу — режимы начнут использовать их.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 animation-delay-500 sm:flex-row">
              <Button size="lg" variant="outline" asChild>
                <Link href="/lobby/join">Присоединиться к лобби</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/auth">
                  Начать без регистрации <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/practice">Открыть тренировки</Link>
              </Button>
            </div>
          </div>

          <Card className="animate-float border-primary/20 bg-card/85 shadow-glow backdrop-blur">
            <CardHeader>
              <CardTitle>Готовность к экзамену</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                ["Орфография", 86],
                ["Пунктуация", 72],
                ["Работа с текстом", 64],
                ["Часть Б", 58]
              ].map(([label, value]) => (
                <div key={label as string} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-muted-foreground">{value}%</span>
                  </div>
                  <Progress value={value as number} />
                </div>
              ))}
              <div className="rounded-2xl border bg-background/70 p-4 text-sm text-muted-foreground">
                Сегодня: 12 заданий, 2 ошибки к повтору, streak 6 дней.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Основные сценарии</h2>
          <p className="mt-3 text-muted-foreground">Все карточки ведут на рабочие страницы приложения.</p>
        </div>
        <LinkCardGrid items={primaryFlows} />
      </section>

      <section className="container pb-16">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Инструменты подготовки</h2>
          <p className="mt-3 text-muted-foreground">Страницы для анализа, повторения, соревнования и работы с контентом.</p>
        </div>
        <LinkCardGrid items={learningTools} />
      </section>

      <section className="container pb-20">
        <Card className="overflow-hidden bg-primary text-primary-foreground">
          <CardContent className="grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Готово к наполнению банком заданий</h2>
              <p className="mt-3 max-w-2xl text-primary-foreground/80">
                Вставьте задания в Supabase-таблицы `tasks`, `texts`, `answers` — тренировки, экзамен, админка и страницы
                анализа смогут работать с реальным банком, а до этого используют демо-данные.
              </p>
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/admin/tasks">Перейти к заданиям</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
