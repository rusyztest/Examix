import { PageShell } from "@/components/layout/page-shell";
import { leaderboard } from "@/lib/data/mock";
import { Card, CardContent } from "@/components/ui/card";

export default async function LobbyResultsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  return (
    <PageShell title={`Результаты лобби ${code.toUpperCase()}`} description="Финальная таблица результатов группового экзамена.">
      <Card>
        <CardContent className="space-y-3 pt-6">
          {leaderboard.map((member, index) => (
            <div key={member.id} className="flex items-center justify-between rounded-xl border p-4">
              <span className="font-semibold">#{index + 1} {member.profiles?.username}</span>
              <span>{member.score} баллов</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
