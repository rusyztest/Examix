import { joinLobbyFromForm } from "@/lib/actions/lobby";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LobbyJoinPage() {
  return (
    <PageShell title="Присоединение к лобби" description="Введите код и ник, чтобы увидеть настройки и список участников в реальном времени.">
      <Card className="mx-auto w-full max-w-xl animate-fade-up">
        <CardHeader><CardTitle>Вход в комнату</CardTitle></CardHeader>
        <CardContent>
          <form action={async (formData) => { "use server"; await joinLobbyFromForm(formData); }} className="grid gap-4">
            <div className="grid gap-2"><Label htmlFor="code">Код комнаты</Label><Input id="code" name="code" placeholder="ABC123" required /></div>
            <div className="grid gap-2"><Label htmlFor="nickname">Ник</Label><Input id="nickname" name="nickname" placeholder="Например, Маша11Б" required /></div>
            <Button>Подключиться</Button>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  );
}
