"use client";

import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { calculateScore, checkAnswer } from "@/lib/exam";
import { formatDuration } from "@/lib/utils";
import type { Task } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export function ExamRunner({ tasks, seconds = 90 * 60 }: { tasks: Task[]; seconds?: number }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const task = tasks[current];
  const checked = useMemo(() => tasks.map((item) => checkAnswer(item, answers[item.id] ?? "")), [answers, tasks]);
  const stats = calculateScore(checked.map((item) => ({ correct: item.correct })));

  if (!task) {
    return (
      <Card>
        <CardHeader><CardTitle>Задания пока не найдены</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">Добавьте задания в Supabase-таблицу tasks или выполните seed.sql.</CardContent>
      </Card>
    );
  }

  if (finished) {
    return (
      <Card>
        <CardHeader><CardTitle>Результат: {stats.score}/{stats.total} ({stats.percent}%)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Progress value={stats.percent} />
          {checked.filter((item) => !item.correct).map((item) => <p key={item.taskId} className="rounded-xl bg-muted p-3 text-sm">Ошибка: правильный ответ — {item.correctAnswer}. {item.explanation}</p>)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4"><CardTitle>Вопрос {current + 1} из {tasks.length}</CardTitle><span className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{formatDuration(seconds)}</span></div>
        <Progress value={(current / tasks.length) * 100} />
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-lg leading-8">{task.question}</p>
        <Input value={answers[task.id] ?? ""} onChange={(event) => setAnswers({ ...answers, [task.id]: event.target.value })} placeholder="Ответ" />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrent(Math.max(0, current - 1))}>Назад</Button>
          {current === tasks.length - 1 ? <Button onClick={() => setFinished(true)}>Завершить</Button> : <Button onClick={() => setCurrent(current + 1)}>Далее</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
