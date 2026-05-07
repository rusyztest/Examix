import { PageShell } from "@/components/layout/page-shell";
import { demoProfile } from "@/lib/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return <PageShell title="Профиль" description="Персональные данные, роль, аватар и настройки обучения."><Card className="max-w-xl"><CardHeader><CardTitle>{demoProfile.username}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground"><p>Роль: {demoProfile.role}</p><p>Избранные задания, streak и рекомендации подключаются к Supabase-профилю.</p></CardContent></Card></PageShell>;
}
