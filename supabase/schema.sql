create extension if not exists "pgcrypto";

create type public.user_role as enum ('student', 'teacher', 'admin');
create type public.exam_mode as enum ('practice', 'exam');
create type public.task_difficulty as enum ('easy', 'medium', 'hard');
create type public.task_type as enum ('single', 'multiple', 'short', 'text');

create table public.texts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  content text not null,
  theme text not null,
  difficulty public.task_difficulty not null default 'medium'
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  part text not null check (part in ('A', 'B', 'TEXT')),
  task_number int not null,
  topic text not null,
  difficulty public.task_difficulty not null default 'medium',
  text_id uuid references public.texts(id) on delete set null,
  question text not null,
  type public.task_type not null default 'short',
  explanation text not null,
  created_at timestamptz not null default now()
);

create table public.answers (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  answer_text text not null,
  is_correct boolean not null default true
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  avatar text,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mode public.exam_mode not null,
  score int not null default 0,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_answer text not null,
  correct boolean not null default false,
  time_spent int not null default 0,
  unique (attempt_id, task_id)
);

create table public.lobbies (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  host_id uuid not null references public.profiles(id) on delete cascade,
  mode public.exam_mode not null,
  settings jsonb not null default '{}'::jsonb,
  started boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.lobby_members (
  id uuid primary key default gen_random_uuid(),
  lobby_id uuid not null references public.lobbies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  score int not null default 0,
  joined_at timestamptz not null default now(),
  finished boolean not null default false,
  unique (lobby_id, user_id)
);

create index tasks_task_number_idx on public.tasks(task_number);
create index tasks_difficulty_idx on public.tasks(difficulty);
create index attempts_user_id_idx on public.attempts(user_id);
create index lobby_members_lobby_id_idx on public.lobby_members(lobby_id);

alter table public.texts enable row level security;
alter table public.tasks enable row level security;
alter table public.answers enable row level security;
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.lobbies enable row level security;
alter table public.lobby_members enable row level security;

create policy "Published content is readable" on public.tasks for select using (true);
create policy "Texts are readable" on public.texts for select using (true);
create policy "Answers are readable for checking" on public.answers for select using (true);
create policy "Profiles are readable" on public.profiles for select using (true);
create policy "Users create own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own attempts" on public.attempts for select using (auth.uid() = user_id);
create policy "Users create own attempts" on public.attempts for insert with check (auth.uid() = user_id);
create policy "Users update own attempts" on public.attempts for update using (auth.uid() = user_id);
create policy "Users manage own answers" on public.attempt_answers for all using (exists (select 1 from public.attempts a where a.id = attempt_id and a.user_id = auth.uid()));
create policy "Lobbies are readable by authenticated users" on public.lobbies for select to authenticated using (true);
create policy "Hosts create lobbies" on public.lobbies for insert to authenticated with check (auth.uid() = host_id);
create policy "Hosts update lobbies" on public.lobbies for update to authenticated using (auth.uid() = host_id);
create policy "Members are readable" on public.lobby_members for select to authenticated using (true);
create policy "Users join as themselves" on public.lobby_members for insert to authenticated with check (auth.uid() = user_id);
create policy "Members update themselves" on public.lobby_members for update to authenticated using (auth.uid() = user_id);

alter publication supabase_realtime add table public.lobbies;
alter publication supabase_realtime add table public.lobby_members;
