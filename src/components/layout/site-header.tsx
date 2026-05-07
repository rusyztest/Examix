import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Тренировка", "/practice"],
  ["Экзамен", "/exam"],
  ["Лобби", "/lobby"],
  ["Учителю", "/teacher"],
  ["Рейтинг", "/leaderboard"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          Examix
        </Link>
        <nav className="order-3 flex w-full items-center gap-4 overflow-x-auto text-sm text-muted-foreground md:order-2 md:w-auto md:gap-6">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="whitespace-nowrap transition hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <Button className="order-2 md:order-3" asChild>
          <Link href="/auth">Продолжить</Link>
        </Button>
      </div>
    </header>
  );
}
