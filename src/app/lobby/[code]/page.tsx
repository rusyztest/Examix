import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LobbyRealtime } from "@/components/lobby/lobby-realtime";
import { PageShell } from "@/components/layout/page-shell";
import type { Lobby, LobbyMember } from "@/types/database";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function LobbyRoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const normalizedCode = code.trim().toUpperCase();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth");

  const { data: lobby, error: lobbyError } = await supabase.from("lobbies").select("*").eq("code", normalizedCode).single<Lobby>();
  if (lobbyError || !lobby) notFound();

  await supabase.from("lobby_members").upsert({ lobby_id: lobby.id, user_id: userData.user.id }, { onConflict: "lobby_id,user_id" });

  const { data: membersData } = await supabase
    .from("lobby_members")
    .select("*, profiles(*)")
    .eq("lobby_id", lobby.id)
    .order("score", { ascending: false });

  const members = (membersData as LobbyMember[] | null) ?? [];

  return (
    <PageShell title="Ожидание участников" description="Realtime-синхронизация подключений, старта экзамена и таблицы результатов через Supabase.">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild><Link href="/exam">Начать демо-экзамен</Link></Button>
        <Button variant="outline" asChild><Link href={`/lobby/${lobby.code}/results`}>Результаты комнаты</Link></Button>
      </div>
      <LobbyRealtime lobby={lobby} initialMembers={members} />
    </PageShell>
  );
}
