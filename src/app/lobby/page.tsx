import { createLobby, joinLobbyFromForm } from "@/lib/actions/lobby";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LobbyPage() {
  return (
    <PageShell title="Групповое лобби" description="Создайте комнату, поделитесь кодом и запустите экзамен для класса синхронно.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="animate-fade-up">
          <CardHeader><CardTitle>Создать комнату</CardTitle></CardHeader>
          <CardContent>
            <form action={createLobby} className="grid gap-4">
              <div className="grid gap-2">
                <Label>Режим</Label>
                <select name="mode" className="h-10 rounded-xl border bg-background px-3">
                  <option value="exam">Экзамен</option>
                  <option value="practice">Тренировка</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label>Номера заданий через запятую</Label>
                <Input name="taskNumbers" placeholder="1,5,12" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div><Label>Количество вопросов</Label><Input name="questionCount" type="number" defaultValue={12} /></div>
                <div><Label>Время, минут</Label><Input name="timeLimit" type="number" defaultValue={90} /></div>
              </div>
              <input type="hidden" name="randomOrder" value="true" />
              <input type="hidden" name="resultsVisibility" value="all" />
              <Button>Создать лобби</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="animate-fade-up animation-delay-150">
          <CardHeader><CardTitle>Подключиться по коду</CardTitle></CardHeader>
          <CardContent>
            <form action={joinLobbyFromForm} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Код комнаты</Label>
                <Input id="code" name="code" placeholder="ABC123" required />
              </div>
              <Button variant="outline">Войти в лобби</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
