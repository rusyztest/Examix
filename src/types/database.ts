export type UserRole = "student" | "teacher" | "admin";
export type ExamMode = "practice" | "exam";
export type TaskDifficulty = "easy" | "medium" | "hard";
export type TaskType = "single" | "multiple" | "short" | "text";

export interface TextRecord {
  id: string;
  title: string;
  author: string | null;
  content: string;
  theme: string;
  difficulty: TaskDifficulty;
}

export interface Task {
  id: string;
  part: "A" | "B" | "TEXT";
  task_number: number;
  topic: string;
  difficulty: TaskDifficulty;
  text_id: string | null;
  question: string;
  type: TaskType;
  explanation: string;
  created_at: string;
  texts?: TextRecord | null;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  task_id: string;
  answer_text: string;
  is_correct: boolean;
}

export interface Profile {
  id: string;
  username: string;
  avatar: string | null;
  role: UserRole;
  created_at: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  mode: ExamMode;
  score: number;
  created_at: string;
  completed_at: string | null;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  task_id: string;
  user_answer: string;
  correct: boolean;
  time_spent: number;
}

export interface LobbySettings {
  taskNumbers: number[];
  questionCount: number;
  difficulty?: TaskDifficulty;
  timeLimit: number;
  randomOrder: boolean;
  privateByCode: boolean;
  resultsVisibility: "host" | "all";
}

export interface Lobby {
  id: string;
  code: string;
  host_id: string;
  mode: ExamMode;
  settings: LobbySettings;
  started: boolean;
  created_at: string;
}

export interface LobbyMember {
  id: string;
  lobby_id: string;
  user_id: string;
  score: number;
  joined_at: string;
  finished: boolean;
  profiles?: Profile;
}
