const WORD_BANK = [
  { word: 'гр..моздкий', isA: true, answer: 'громоздкий' },
  { word: 'школьный в..хтёр', isA: false, answer: 'школьный вахтёр' },
  { word: 'р..стительность', isA: true, answer: 'растительность' },
  { word: 'высокий к..блук', isA: false, answer: 'высокий каблук' },
  { word: 'нак..лоть дров', isA: false, answer: 'наколоть дров' },
  { word: 'з..ря на небе', isA: true, answer: 'заря на небе' },
  { word: 'б..гаж в машине', isA: false, answer: 'багаж в машине' },
  { word: 'к..саться темы', isA: false, answer: 'касаться темы' },
  { word: 'в..ренье из вишни', isA: false, answer: 'варенье из вишни' },
  { word: 'ск..калка для прыжков', isA: false, answer: 'скакалка для прыжков' },
  { word: 'р..внина у реки', isA: true, answer: 'равнина у реки' },
  { word: 'з..гадка природы', isA: false, answer: 'загадка природы' },
  { word: 'подр..сти за лето', isA: false, answer: 'подрасти за лето' },
  { word: 'бл..годарить за помощь', isA: false, answer: 'благодарить за помощь' },
  { word: 'отр..сль экономики', isA: true, answer: 'отрасль экономики' },
  { word: 'прекр..сный вид', isA: false, answer: 'прекрасный вид' },
  { word: 'пл..вец на дорожке', isA: false, answer: 'пловец на дорожке' },
  { word: 'ср..внить результаты', isA: false, answer: 'сравнить результаты' },
  { word: 'к..мпания друзей', isA: false, answer: 'компания друзей' },
  { word: 'выр..стить рассаду', isA: true, answer: 'вырастить рассаду' },
  { word: 'подск..чить от радости', isA: false, answer: 'подскочить от радости' },
  { word: 'р..сток фасоли', isA: true, answer: 'росток фасоли' },
  { word: 'р..стовщик в романе', isA: true, answer: 'ростовщик в романе' },
  { word: 'ск..чок напряжения', isA: false, answer: 'скачок напряжения' },
  { word: 'з..рево на горизонте', isA: false, answer: 'зарево на горизонте' },
  { word: 'приг..рать на солнце', isA: false, answer: 'пригорать на солнце' },
  { word: 'з..рница вечером', isA: true, answer: 'зарница вечером' },
  { word: 'р..ссада на подоконнике', isA: false, answer: 'рассада на подоконнике' }
];

const tasksEl = document.getElementById('tasks');
const resultEl = document.getElementById('result');
const checkBtn = document.getElementById('checkBtn');
const newSetBtn = document.getElementById('newSetBtn');

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSet() {
  const correctCount = 2 + Math.floor(Math.random() * 3); // 2..4
  const totalCount = 5;

  const aWords = shuffle(WORD_BANK.filter((w) => w.isA)).slice(0, correctCount);
  const notAWords = shuffle(WORD_BANK.filter((w) => !w.isA)).slice(0, totalCount - correctCount);
  return shuffle([...aWords, ...notAWords]);
}

let currentSet = [];

function renderTasks() {
  currentSet = buildSet();
  tasksEl.innerHTML = '';
  resultEl.hidden = true;
  resultEl.textContent = '';

  currentSet.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `
      <label>
        <input type="checkbox" data-index="${idx}" />
        <span>${idx + 1}. ${item.word}</span>
      </label>
    `;
    tasksEl.appendChild(div);
  });
}

function checkAnswers() {
  const checks = tasksEl.querySelectorAll('input[type="checkbox"]');
  const selected = new Set();

  checks.forEach((checkbox) => {
    if (checkbox.checked) selected.add(Number(checkbox.dataset.index));
  });

  let correct = 0;
  const rightIndices = [];

  currentSet.forEach((item, idx) => {
    if (item.isA) {
      rightIndices.push(idx);
      if (selected.has(idx)) correct++;
    }
  });

  const selectedWrong = [...selected].filter((idx) => !currentSet[idx].isA).length;
  const totalRight = rightIndices.length;

  resultEl.hidden = false;
  resultEl.innerHTML = `
    <strong>Результат:</strong> ${correct} из ${totalRight} правильных вариантов выбрано верно.<br/>
    ${selectedWrong > 0 ? `Ошибочно выбрано: ${selectedWrong}.<br/>` : ''}
    <strong>Правильные ответы:</strong> ${rightIndices.map((i) => `${i + 1}) ${currentSet[i].answer}`).join('; ')}.
  `;
}

checkBtn.addEventListener('click', checkAnswers);
newSetBtn.addEventListener('click', renderTasks);

renderTasks();
