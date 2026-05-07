import Link from "next/link";
import { ArrowRight, BarChart3, BookOpenCheck, Timer, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: BookOpenCheck, title: "Тренировка по типам", text: "Выбирайте номера заданий, сложность и повторяйте ошибки с объяснениями." },
  { icon: Timer, title: "Полный экзамен", text: "Симуляция варианта с таймером, сохранением попытки и статистикой по разделам." },
  { icon: Users, title: "Лобби для класса", text: "Учитель создает комнату, запускает экзамен синхронно и видит рейтинг." },
  { icon: BarChart3, title: "Прогресс", text: "История, streak, слабые темы, рекомендации и избранные задания." }
];

export default function HomePage() {
  return (
    <section className="hero-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background to-background" />
      <div className="container relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">Белорусский выпускной экзамен · русский язык · 11 класс</span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-7xl">Examix превращает подготовку в понятный маршрут</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Полноценный EdTech-сервис для индивидуальной подготовки, экзаменационной практики и групповых занятий через realtime-лобби.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild><Link href="/dashboard">Начать подготовку <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link href="/lobby">Создать лобби</Link></Button>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => <Card key={feature.title} className="bg-card/80 backdrop-blur"><CardHeader><feature.icon className="h-6 w-6 text-primary" /><CardTitle>{feature.title}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">{feature.text}</CardContent></Card>)}
        </div>
      </div>
    </section>
  );
}
