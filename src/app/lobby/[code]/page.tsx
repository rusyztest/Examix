import { LobbyRealtime } from "@/components/lobby/lobby-realtime";
import { PageShell } from "@/components/layout/page-shell";
import { leaderboard } from "@/lib/data/mock";
import type { Lobby } from "@/types/database";

export default async function LobbyRoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const lobby: Lobby = { id: "demo-lobby", code: code.toUpperCase(), host_id: "demo-user", mode: "exam", started: false, created_at: new Date().toISOString(), settings: { taskNumbers: [1,5,12], questionCount: 12, timeLimit: 5400, randomOrder: true, privateByCode: true, resultsVisibility: "all" } };
  return <PageShell title="Ожидание участников" description="Realtime-синхронизация подключений, старта экзамена и таблицы результатов через Supabase."><LobbyRealtime lobby={lobby} initialMembers={leaderboard} /></PageShell>;
}
