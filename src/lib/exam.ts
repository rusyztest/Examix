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
}

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

  return {
    taskId: task.id,
    userAnswer,
    correct,
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
