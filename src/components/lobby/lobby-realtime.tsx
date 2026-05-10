"use client";

import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import type { Lobby, LobbyMember } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LobbyRealtime({ lobby, initialMembers }: { lobby: Lobby; initialMembers: LobbyMember[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [started, setStarted] = useState(lobby.started);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const channel = supabase
      .channel(`lobby:${lobby.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "lobby_members", filter: `lobby_id=eq.${lobby.id}` }, async () => {
        const { data } = await supabase.from("lobby_members").select("*, profiles(*)").eq("lobby_id", lobby.id).order("score", { ascending: false });
        setMembers((data as LobbyMember[]) ?? []);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "lobbies", filter: `id=eq.${lobby.id}` }, (payload) => {
        setStarted(Boolean((payload.new as Lobby).started));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [lobby.id, supabase]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Лобби {lobby.code}</CardTitle>
          <Badge className={started ? "border-emerald-500 text-emerald-500" : ""}>{started ? "Экзамен идет" : "Ожидание"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => <div key={member.id} className="rounded-2xl border p-4"><p className="font-medium">{member.profiles?.username ?? member.user_id}</p><p className="text-sm text-muted-foreground">Баллы: {member.score} · {member.finished ? "готов" : "в процессе"}</p></div>)}
        </div>
        <div className="rounded-xl border p-4 text-sm text-muted-foreground">
          Лимит времени: {Math.round(lobby.settings.timeLimit / 60)} мин · Заданий: {lobby.settings.questionCount}
        </div>
        <Button className="w-full sm:w-auto">Начать игру</Button>
      </CardContent>
    </Card>
  );
}
