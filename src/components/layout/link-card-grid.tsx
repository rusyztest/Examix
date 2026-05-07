import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface LinkCardItem {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function LinkCardGrid({ items }: { items: LinkCardItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <Link key={item.href} href={item.href} className="group animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
          <Card className="h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
            <CardHeader>
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <item.icon className="h-5 w-5" />
              </div>
              <CardTitle className="flex items-center justify-between gap-3">
                {item.title}
                <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">{item.description}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
