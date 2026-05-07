import type { Attempt, AttemptAnswer, LobbyMember, Profile, Task } from "@/types/database";

export const demoProfile: Profile = {
  id: "demo-user",
  username: "Анна Коваль",
  avatar: null,
  role: "student",
  created_at: new Date().toISOString()
};

export const demoTasks: Task[] = [
  {
    id: "task-1",
    part: "A",
    task_number: 1,
    topic: "Орфография: безударные гласные",
    difficulty: "easy",
    text_id: null,
    question: "Укажите слово, в котором пропущена проверяемая безударная гласная корня: заг..реть, прик..саться, д..лина, р..стение.",
    type: "short",
    explanation: "В слове «долина» безударная гласная проверяется словом «дол». Остальные слова регулируются чередованием или словарным написанием.",
    created_at: new Date().toISOString(),
    answers: [{ id: "a1", task_id: "task-1", answer_text: "долина", is_correct: true }]
  },
  {
    id: "task-5",
    part: "A",
    task_number: 5,
    topic: "Пунктуация в сложном предложении",
    difficulty: "medium",
    text_id: null,
    question: "Сколько запятых нужно поставить: Когда начался дождь ученики вернулись в класс и учитель продолжил объяснение темы.",
    type: "short",
    explanation: "Запятая ставится после придаточной части «Когда начался дождь» и перед второй грамматической основой «учитель продолжил».",
    created_at: new Date().toISOString(),
    answers: [{ id: "a5", task_id: "task-5", answer_text: "2", is_correct: true }]
  },
  {
    id: "task-12",
    part: "B",
    task_number: 12,
    topic: "Средства связи предложений в тексте",
    difficulty: "hard",
    text_id: "text-1",
    question: "Определите средство связи второго и третьего предложений текста: лексический повтор, местоимение или синоним.",
    type: "short",
    explanation: "Повтор ключевого слова сохраняет тему и логическую связность фрагмента.",
    created_at: new Date().toISOString(),
    texts: {
      id: "text-1",
      title: "О языке",
      author: "Учебный фрагмент",
      content: "Язык хранит память народа. Язык помогает человеку мыслить точнее. Это богатство важно беречь каждый день.",
      theme: "Язык и культура",
      difficulty: "medium"
    },
    answers: [{ id: "a12", task_id: "task-12", answer_text: "лексический повтор", is_correct: true }]
  }
];

export const demoAttempts: Attempt[] = [
  { id: "attempt-1", user_id: "demo-user", mode: "exam", score: 9, created_at: "2026-05-01T10:00:00Z", completed_at: "2026-05-01T11:20:00Z" },
  { id: "attempt-2", user_id: "demo-user", mode: "practice", score: 7, created_at: "2026-05-04T16:00:00Z", completed_at: "2026-05-04T16:25:00Z" }
];

export const demoAttemptAnswers: AttemptAnswer[] = [
  { id: "aa1", attempt_id: "attempt-1", task_id: "task-1", user_answer: "долина", correct: true, time_spent: 42 },
  { id: "aa2", attempt_id: "attempt-1", task_id: "task-5", user_answer: "1", correct: false, time_spent: 78 },
  { id: "aa3", attempt_id: "attempt-1", task_id: "task-12", user_answer: "повтор", correct: false, time_spent: 91 }
];

export const leaderboard: LobbyMember[] = [
  { id: "m1", lobby_id: "l1", user_id: "u1", score: 11, joined_at: new Date().toISOString(), finished: true, profiles: { ...demoProfile, id: "u1", username: "Мария" } },
  { id: "m2", lobby_id: "l1", user_id: "u2", score: 10, joined_at: new Date().toISOString(), finished: true, profiles: { ...demoProfile, id: "u2", username: "Илья" } },
  { id: "m3", lobby_id: "l1", user_id: "u3", score: 8, joined_at: new Date().toISOString(), finished: true, profiles: { ...demoProfile, id: "u3", username: "София" } }
];
