import type { Answer, AttemptAnswer, Task, TaskDifficulty } from "@/types/database";

export interface GenerateOptions {
  mode: "practice" | "exam";
  count?: number;
  taskNumbers?: number[];
  difficulty?: TaskDifficulty;
}

export interface CheckedAnswer {
  taskId: string;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  partial: boolean;
  points: number;
}

const PRIMARY_TO_TEST: Record<number, number> = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:9,9:10,10:12,11:14,12:16,13:18,14:20,15:22,16:23,17:25,18:27,19:28,20:29,21:31,22:32,23:34,24:35,25:36,26:37,27:38,28:39,29:41,30:42,31:43,32:44,33:45,34:46,35:47,36:48,37:49,38:50,39:51,40:52,41:53,42:54,43:55,44:56,45:57,46:58,47:59,48:60,49:61,50:62,51:63,52:64,53:65,54:66,55:67,56:68,57:69,58:70,59:71,60:72,61:73,62:74,63:75,64:76,65:77,66:78,67:79,68:80,69:81,70:82,71:83,72:84,73:85,74:87,75:89,76:90,77:92,78:96,79:98,80:100};

export function normalizeAnswer(answer: string) {
  return answer.trim().replace(/ё/g, "е").replace(/\s+/g, " ").toLowerCase();
}

export function normalizeChoiceAnswer(answer: string) {
  const compact = answer.replace(/\D/g, "");
  const items = compact.length > 1 && !answer.match(/[,.;|\s]/)
    ? compact.split("")
    : answer
        .replace(/[;|]/g, ",")
        .split(/[,\.\s]+/)
        .map((item) => item.trim())
        .filter(Boolean);

  return Array.from(new Set(items)).sort((a, b) => a.localeCompare(b, "ru")).join(",");
}

export function checkAnswer(task: Task, userAnswer: string): CheckedAnswer {
  const correctAnswers = (task.answers ?? []).filter((answer) => answer.is_correct);
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  const normalizedChoiceUserAnswer = normalizeChoiceAnswer(userAnswer);
  const correct = correctAnswers.some((answer) => {
    const normalizedCorrectAnswer = normalizeAnswer(answer.answer_text);
    return (
      normalizedCorrectAnswer === normalizedUserAnswer ||
      normalizeChoiceAnswer(answer.answer_text) === normalizedChoiceUserAnswer
    );
  });

  const partial = !correct && correctAnswers.some((answer) => {
    const expected = normalizeChoiceAnswer(answer.answer_text).split(",").filter(Boolean);
    const actual = normalizeChoiceAnswer(userAnswer).split(",").filter(Boolean);
    if (!expected.length || !actual.length) return false;
    const mismatches = Math.abs(expected.length - actual.length) + expected.filter((v, i) => actual[i] !== v).length;
    return mismatches === 1;
  });

  const points = correct ? 2 : partial ? 1 : 0;

  return {
    taskId: task.id,
    userAnswer,
    correct,
    partial,
    points,
    correctAnswer: correctAnswers.map((answer) => answer.answer_text).join(" / "),
    explanation: task.explanation
  };
}

export function calculateScore(results: Pick<AttemptAnswer, "correct">[]) {
  const correct = results.filter((result) => result.correct).length;
  const total = results.length;
  return {
    correct,
    total,
    score: correct,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100)
  };
}

export function calculateDetailedScore(results: Pick<CheckedAnswer, "correct" | "partial" | "points">[], fullMode = true) {
  const correct = results.filter((r) => r.correct).length;
  const partial = results.filter((r) => r.partial).length;
  const wrong = results.length - correct - partial;
  const primary = results.reduce((sum, r) => sum + r.points, 0);
  if (!fullMode) return { correct, partial, wrong, primary, percent: Math.round((correct / Math.max(results.length, 1)) * 100) };
  return { correct, partial, wrong, primary, test: PRIMARY_TO_TEST[primary] ?? 0 };
}

export function selectExamTasks(tasks: Task[], options: GenerateOptions) {
  const filtered = tasks.filter((task) => {
    const taskNumberOk = !options.taskNumbers?.length || options.taskNumbers.includes(task.task_number);
    const difficultyOk = !options.difficulty || task.difficulty === options.difficulty;
    return taskNumberOk && difficultyOk;
  });
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return options.mode === "exam" ? byExamStructure(shuffled) : shuffled.slice(0, options.count ?? 10);
}

function byExamStructure(tasks: Task[]) {
  const structure = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return structure.flatMap((number) => tasks.filter((task) => task.task_number === number).slice(0, 1));
}

export function weakTopics(tasks: Task[], answers: AttemptAnswer[]) {
  const wrongTaskIds = new Set(answers.filter((answer) => !answer.correct).map((answer) => answer.task_id));
  const topics = tasks.filter((task) => wrongTaskIds.has(task.id)).map((task) => task.topic);
  return Array.from(new Set(topics)).slice(0, 5);
}
