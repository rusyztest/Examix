insert into public.texts (id, title, author, content, theme, difficulty) values
('00000000-0000-0000-0000-000000000101', 'О языке', 'Учебный фрагмент', 'Язык хранит память народа. Язык помогает человеку мыслить точнее. Это богатство важно беречь каждый день.', 'Язык и культура', 'medium')
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  content = excluded.content,
  theme = excluded.theme,
  difficulty = excluded.difficulty;

insert into public.tasks (id, part, task_number, topic, difficulty, text_id, question, type, explanation) values
('00000000-0000-0000-0000-000000000201', 'A', 1, 'Орфография: безударные гласные', 'easy', null, 'Укажите слово с проверяемой безударной гласной корня: заг..реть, прик..саться, д..лина, р..стение.', 'short', 'В слове «долина» написание проверяется однокоренным словом.'),
('00000000-0000-0000-0000-000000000202', 'A', 5, 'Пунктуация в сложном предложении', 'medium', null, 'Сколько запятых нужно поставить: Когда начался дождь ученики вернулись в класс и учитель продолжил объяснение темы.', 'short', 'Нужны запятые после придаточной части и между частями сложного предложения.'),
('00000000-0000-0000-0000-000000000203', 'B', 12, 'Средства связи предложений в тексте', 'hard', '00000000-0000-0000-0000-000000000101', 'Определите средство связи второго и третьего предложений текста.', 'short', 'Повтор ключевого слова связывает предложения по смыслу.')
on conflict (id) do update set
  part = excluded.part,
  task_number = excluded.task_number,
  topic = excluded.topic,
  difficulty = excluded.difficulty,
  text_id = excluded.text_id,
  question = excluded.question,
  type = excluded.type,
  explanation = excluded.explanation;

insert into public.answers (task_id, answer_text, is_correct)
select seed.task_id::uuid, seed.answer_text, seed.is_correct
from (values
  ('00000000-0000-0000-0000-000000000201', 'долина', true),
  ('00000000-0000-0000-0000-000000000202', '2', true),
  ('00000000-0000-0000-0000-000000000203', 'лексический повтор', true)
) as seed(task_id, answer_text, is_correct)
where not exists (
  select 1
  from public.answers existing
  where existing.task_id = seed.task_id::uuid
    and existing.answer_text = seed.answer_text
);
