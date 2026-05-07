create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'user_role') then
    create type public.user_role as enum ('student', 'teacher', 'admin');
  end if;

  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'exam_mode') then
    create type public.exam_mode as enum ('practice', 'exam');
  end if;

  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'task_difficulty') then
    create type public.task_difficulty as enum ('easy', 'medium', 'hard');
  end if;

  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'task_type') then
    create type public.task_type as enum ('single', 'multiple', 'short', 'text');
  end if;
end $$;

create table if not exists public.texts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  content text not null,
  theme text not null,
  difficulty public.task_difficulty not null default 'medium'
);

create table if not exists public.tasks (
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

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  answer_text text not null,
  is_correct boolean not null default true
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  avatar text,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  mode public.exam_mode not null,
  score int not null default 0,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_answer text not null,
  correct boolean not null default false,
  time_spent int not null default 0,
  unique (attempt_id, task_id)
);

create table if not exists public.lobbies (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  host_id uuid not null references public.profiles(id) on delete cascade,
  mode public.exam_mode not null,
  settings jsonb not null default '{}'::jsonb,
  started boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.lobby_members (
  id uuid primary key default gen_random_uuid(),
  lobby_id uuid not null references public.lobbies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  score int not null default 0,
  joined_at timestamptz not null default now(),
  finished boolean not null default false,
  unique (lobby_id, user_id)
);

create index if not exists tasks_task_number_idx on public.tasks(task_number);
create index if not exists tasks_difficulty_idx on public.tasks(difficulty);
create index if not exists attempts_user_id_idx on public.attempts(user_id);
create index if not exists lobby_members_lobby_id_idx on public.lobby_members(lobby_id);

alter table public.texts enable row level security;
alter table public.tasks enable row level security;
alter table public.answers enable row level security;
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;
alter table public.lobbies enable row level security;
alter table public.lobby_members enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'tasks' and policyname = 'Published content is readable') then
    create policy "Published content is readable" on public.tasks for select using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'texts' and policyname = 'Texts are readable') then
    create policy "Texts are readable" on public.texts for select using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'answers' and policyname = 'Answers are readable for checking') then
    create policy "Answers are readable for checking" on public.answers for select using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Profiles are readable') then
    create policy "Profiles are readable" on public.profiles for select using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users create own profile') then
    create policy "Users create own profile" on public.profiles for insert with check (auth.uid() = id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users update own profile') then
    create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'attempts' and policyname = 'Users read own attempts') then
    create policy "Users read own attempts" on public.attempts for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'attempts' and policyname = 'Users create own attempts') then
    create policy "Users create own attempts" on public.attempts for insert with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'attempts' and policyname = 'Users update own attempts') then
    create policy "Users update own attempts" on public.attempts for update using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'attempt_answers' and policyname = 'Users manage own answers') then
    create policy "Users manage own answers" on public.attempt_answers for all using (exists (select 1 from public.attempts a where a.id = attempt_id and a.user_id = auth.uid()));
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobbies' and policyname = 'Lobbies are readable by authenticated users') then
    create policy "Lobbies are readable by authenticated users" on public.lobbies for select to authenticated using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobbies' and policyname = 'Hosts create lobbies') then
    create policy "Hosts create lobbies" on public.lobbies for insert to authenticated with check (auth.uid() = host_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobbies' and policyname = 'Hosts update lobbies') then
    create policy "Hosts update lobbies" on public.lobbies for update to authenticated using (auth.uid() = host_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobby_members' and policyname = 'Members are readable') then
    create policy "Members are readable" on public.lobby_members for select to authenticated using (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobby_members' and policyname = 'Users join as themselves') then
    create policy "Users join as themselves" on public.lobby_members for insert to authenticated with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lobby_members' and policyname = 'Members update themselves') then
    create policy "Members update themselves" on public.lobby_members for update to authenticated using (auth.uid() = user_id);
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'lobbies') then
    alter publication supabase_realtime add table public.lobbies;
  end if;

  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'lobby_members') then
    alter publication supabase_realtime add table public.lobby_members;
  end if;
end $$;
