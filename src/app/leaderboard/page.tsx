import { PageShell } from "@/components/layout/page-shell";
import { leaderboard } from "@/lib/data/mock";
import { Card, CardContent } from "@/components/ui/card";

export default function LeaderboardPage() {
  return <PageShell title="Рейтинг" description="Соревнование учеников по результатам экзаменов и групповых лобби."><Card><CardContent className="space-y-3 pt-6">{leaderboard.map((member,index)=><div key={member.id} className="flex items-center justify-between rounded-xl border p-4"><span className="font-semibold">#{index+1} {member.profiles?.username}</span><span>{member.score} баллов</span></div>)}</CardContent></Card></PageShell>;
}
