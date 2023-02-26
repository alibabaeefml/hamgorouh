// declartions

const quiz_resource = {
  questions: [
    {
      question: {type: String, value: "کدام گزینه صحیح است؟", default: "default question"},
      choices: [
        {
          type: String || Number,
          value: "گزینه",
          default: "default choice",
        },
      ],
    },
  ],
  options: {
    total_time: {type: Number || null, value: 20, default: 20},
    time_per_question: {type: Number || null, value: 1, default: 1},
    is_randomly: {type: Boolean || null, value: true, default: true},
    view_per_question: {type: Boolean || null, value: true, default: true},
  },
};

let sample_quiz = {
  questions: [
    {
      id: "dv31f353",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "65g1fg6ngn",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "fbf5b16",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "613fsbfb",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
  ],
  options: {
    name: "سوالات مسابقه",
    total_time: 3600,
    time_per_question: 60,
    is_randomly: true,
  },
};

const question_index = {
  current_index: null,
  get() {
    return this.current_index;
  },
  set(i) {
    this.current_index = i;
    $("[current-question-number]").text(i + 1);
  },
};

const create_choice = (q) => {
  q.choices.map((a) => {
    let choice_el = ` <label class="container">
  ${a}
<input type="radio" name="${q.id}" id="" />
<span class="checkmark"></span>
</label>`;
    $(`#${q.id} choice`).append(choice_el);
  });
};

const create_question = (q, i) => {
  let question_el = `<single-question class="flex flex-col justify-between gap-5" id="${q.id}">
  <question>
    <h2>${i + 1 + "- " + q.question}</h2>
  </question>
  <choice class="">
  </choice>
  </single-question>`;

  $("exam").append(question_el);
  create_choice(q);
  question_index.set(i);
};

const create_quiz = () => {
  if (sample_quiz.options.time_per_question) {
    create_question(sample_quiz.questions[0], 0);
    question_index.set(0);
  } else {
    sample_quiz.questions.map((q, i) => {
      create_question(q, i);
    });
  }
  $("[total-questions]").text(sample_quiz.questions.length);
};

const remove_question = (id) => {
  $(`single-question#${id}`).remove();
};

const next_question = (el) => {
  const q = sample_quiz.questions;
  const i = question_index.get();

  if (i < q.length - 1) {
    create_question(q[i + 1], i + 1);
    remove_question(q[i].id);
  } else {
    $(el).toggleClass("hidden");
  }
  
};

const answers = {};

$(() => {
  create_quiz();
});
