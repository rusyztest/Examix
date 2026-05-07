import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Тренировка", "/practice"],
  ["Экзамен", "/exam"],
  ["Лобби", "/lobby"],
  ["Рейтинг", "/leaderboard"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><GraduationCap className="h-5 w-5" /></span>
          Examix
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-foreground">{label}</Link>)}
        </nav>
        <Button asChild><Link href="/auth">Войти</Link></Button>
      </div>
    </header>
  );
}
