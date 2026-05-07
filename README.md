# Examix

Examix — современная образовательная платформа для подготовки школьников Беларуси к выпускному экзамену по русскому языку после 11 класса.

## Возможности

- тренировка по отдельным номерам заданий, сложности и темам;
- полный экзамен с таймером, генерацией варианта и анализом ошибок;
- групповые экзамены через lobby code и Supabase Realtime;
- роли ученика, учителя и администратора;
- история попыток, прогресс, streak, рейтинг и рекомендации слабых тем;
- админ-панель для управления заданиями, текстами и пользователями.

## Стек

- Next.js App Router, React, TypeScript;
- Tailwind CSS и shadcn/ui-style компоненты;
- Supabase Anonymous Auth, PostgreSQL, Realtime и Storage-ready профили;
- server actions для гостевого входа, результатов и лобби.

## Структура

```txt
src/app                  страницы App Router
src/components/ui        reusable UI-kit
src/components/exam      компоненты тренировки и экзамена
src/components/lobby     realtime-компоненты лобби
src/lib/actions          server actions
src/lib/supabase         Supabase browser/server clients
src/lib/exam.ts          генерация, проверка, подсчет баллов
src/types                типизированные модели БД
supabase/schema.sql      schema + RLS + realtime publication
supabase/seed.sql        пример заданий и ответов
```

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Затем откройте `http://localhost:3000`.

## Supabase

1. Создайте проект Supabase.
2. Выполните `supabase/schema.sql` в SQL editor.
3. Выполните `supabase/seed.sql` для демо-банка заданий.
4. Добавьте переменные окружения из `.env.example`.
5. Включите Anonymous sign-ins в Authentication → Providers, чтобы пользователи могли входить без почты и пароля.

## Auth без регистрации

- Страница `/auth` использует гостевой вход: пользователь вводит только имя.
- Server action вызывает `supabase.auth.signInAnonymously()` и создает строку в `profiles`.
- Для ролей `teacher` и `admin` администратор проекта может вручную изменить поле `profiles.role` в Supabase.

## Realtime lobby flow

- `lobbies.settings` хранит JSON с режимом, номерами заданий, количеством вопросов, временем, случайным порядком и видимостью результатов.
- `LobbyRealtime` подписывается на `lobbies` и `lobby_members` через `postgres_changes`.
- Учитель/host меняет `started`, участники получают событие старта и синхронно переходят к экзамену.
- Результаты участников обновляются в `lobby_members.score` и сортируются в рейтинге.

## Проверка качества

```bash
npm run typecheck
npm run lint
npm run build
```
