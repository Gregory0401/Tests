//Класс, который представляет сам тест
class Quiz {
  constructor(type, questions, results) {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index) {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if (value >= 1) {
      correct = index;
    } else {
      //Иначе ищем, какой ответ может быть правильным
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next() {
    this.current++;

    if (this.current >= this.questions.length) {
      this.End();
    }
  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//Класс, представляющий результат
class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value) {
    if (this.value <= value) {
      return true;
    } else {
      return false;
    }
  }
}

const results = [
  new Result("Ваша аура - Голубая", 6),
  new Result("Ваша аура - Красная", 24),
  new Result("Ваша аура - Желтая", 12),
  new Result("Ваша аура - Фиолетовая", 18),
];

const questions = [
  new Question(
    "Какое место заставляет вас чувствовать себя спокойно и расслабленно? ",
    [
      new Answer("Маленький городок", 1),
      new Answer("Большой, шумный город", 2),
      new Answer("Природа", 3),
      new Answer("Место, где я могу быть в одиночестве", 4),
    ]
  ),

  new Question("Какой цвет вы предпочитаете в одежде?", [
    new Answer("Красный", 3),
    new Answer("Белый", 2),
    new Answer("Черный", 1),
    new Answer("Синий", 4),
  ]),

  new Question(
    "Какое из этих животных лучше всего отражает вашу индивидуальность?",
    [
      new Answer("Черепаха", 4),
      new Answer("Верный щенок", 1),
      new Answer("Дикий тигр", 3),
      new Answer("Голубь мира", 2),
    ]
  ),

  new Question("Что из этого может сделать вас счастливым?", [
    new Answer("Успех и победа", 2),
    new Answer("Помощь другим", 4),
    new Answer("Романтические чувства", 3),
    new Answer("Медитация/Молитва", 1),
  ]),

  new Question("Что из этого - наиболее ценно для вас", [
    new Answer("Быть счастливым", 3),
    new Answer("Сила и власть", 1),
    new Answer("Баланс и покой", 2),
    new Answer("Быть любимым", 4),
  ]),

  new Question("Как вы себя чувствуете прямо сейчас?", [
    new Answer("Полон энергии", 3),
    new Answer("Меня переполняют эмоции", 4),
    new Answer("Злость и раздражение", 2),
    new Answer("Задумчив, пытаюсь сосредоточиться", 1),
  ]),
];

const quiz = new Quiz(1, questions, results);

Update();

function Update() {
  if (quiz.current < quiz.questions.length) {
    headElem.innerHTML = quiz.questions[quiz.current].text;

    buttonsElem.innerHTML = "";

    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let btn = document.createElement("button");
      btn.className = "button";

      btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

      btn.setAttribute("index", i);

      buttonsElem.appendChild(btn);
    }

    pagesElem.innerHTML = quiz.current + 1 + " / " + quiz.questions.length;

    Init();
  } else {
    buttonsElem.innerHTML = "";
    headElem.innerHTML = quiz.results[quiz.result].text;
    pagesElem.innerHTML = "Очки: " + quiz.score;
  }
}

function Init() {
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  let correct = quiz.Click(index);

  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive";
  }

  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong";
    }
  } else {
    btns[index].className = "button button_correct";
  }

  setTimeout(Update, 1000);
}
