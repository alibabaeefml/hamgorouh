// declartions

const quiz_resource = {
  questions: [
    {
      question: {type: String, value: "کدام گزینه صحیح است؟", default: "default question"},
      answers: [
        {
          type: String || Number,
          value: "گزینه",
          default: "default answer",
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
      answers: ["گزینه", "گزینه", "گزینه", "گزینه"],
    }
  ],
  options: {
    name: "سوالات مسابقه",
    view_per_question: true,
    total_time: 3600,
    time_per_question: 60,
    is_randomly: true,
  },
};

const create_quiz = () => {
  const create_answer = (q) => {
    q.answers.map((a) => {
      let answer_el = ` <label class="container">
    ${a}
  <input type="radio" name="${q.id}" id="" />
  <span class="checkmark"></span>
  </label>`;
      $(`#${q.id} answer`).append(answer_el);
    });
  };

  sample_quiz.questions.map((q, i) => {

    let question_el = `<single-question class="flex flex-col justify-between gap-5" id="${q.id}">
    <question>
      <h2>${q.question}</h2>
    </question>
    <answer class="">
    </answer>
    </single-question>`;

    $("exam").append(question_el);
    create_answer(q);
  });
};

$(() => {
  create_quiz()
});
