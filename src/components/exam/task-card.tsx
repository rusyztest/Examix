"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { checkAnswer } from "@/lib/exam";
import type { Task } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function TaskCard({ task, instant = true }: { task: Task; instant?: boolean }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkAnswer> | null>(null);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Задание {task.task_number}</Badge>
          <Badge className="border-primary/30 bg-primary/10 text-primary">{task.part}</Badge>
          <Badge>{task.difficulty}</Badge>
        </div>
        <CardTitle>{task.topic}</CardTitle>
        <CardDescription>{task.texts?.title ? `${task.texts.title}: ${task.texts.content}` : "Короткий ответ без пробелов и лишних символов"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-7">{task.question}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Введите ответ" />
          <Button onClick={() => setResult(checkAnswer(task, answer))} disabled={!answer}>Проверить</Button>
        </div>
        {instant && result ? (
          <div className={`rounded-2xl border p-4 ${result.correct ? "border-emerald-500/40 bg-emerald-500/10" : "border-destructive/40 bg-destructive/10"}`}>
            <div className="mb-2 flex items-center gap-2 font-semibold">
              {result.correct ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
              {result.correct ? "Верно" : `Ошибка. Правильный ответ: ${result.correctAnswer}`}
            </div>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
