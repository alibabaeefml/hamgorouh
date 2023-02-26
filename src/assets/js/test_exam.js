// Hamgorouh Quiz Module

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
    {
      id: "gnfnfm",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "gdngn",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "dfngdnd",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
    {
      id: "fdndgn",
      question: "کدام گزینه صحیح است؟",
      choices: ["گزینه", "گزینه", "گزینه", "گزینه"],
    },
  ],
  options: {
    name: "سوالات مسابقه",
    total_time: 5,
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

const create_choices = (q) => {
  q.choices.map((a) => {
    let choices_el = ` <label class="container">
  ${a}
<input type="radio" name="${q.id}" data="${a}" />
<span class="checkmark"></span>
</label>`;
    $(`#${q.id} choices`).append(choices_el);
  });
};

const create_question = (q, i) => {
  let question_el = `<single-question class="flex flex-col justify-between gap-5" id="${q.id}">
  <question>
    <h2>${i + 1 + "- " + q.question}</h2>
  </question>
  <choices class="">
  </choices>
  </single-question>`;

  $("exam").append(question_el);
  create_choices(q);
  question_index.set(i);
  $("#next_question_btn").attr("disabled", "disabled");
  $("choices input").change(() => {
    $("#next_question_btn").removeAttr("disabled");
  });
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
  quiz_timer();
};

const remove_question = (id) => {
  $(`single-question#${id}`).remove();
};

const next_question = () => {
  if ($("#submit_exam_btn").not("disabled")) {
    const q = sample_quiz.questions;
    const i = question_index.get();
    remove_question(q[i].id);
    question_index.set(i + 1);
    create_question(q[question_index.get()], question_index.get());

    if (!(question_index.get() < q.length - 1)) {
      $("#next_question_btn").toggleClass("hidden");
    }
  }
};

const answers = {};

const quiz_timer = () => {
  let total = sample_quiz.options.total_time;
  var timer = new easytimer.Timer({countdown: true, startValues: {seconds: 0}});

  timer.start({startValues: {seconds: total}, target: {seconds: 0}});
  $("[total-time]").html(timer.getTimeValues().toString());

  timer.addEventListener("secondsUpdated", function (e) {
    $("[total-time]").html(timer.getTimeValues().toString());
  });

  timer.addEventListener("targetAchieved", function (e) {
    console.log("time finished");
    clearInterval(interval);
  });

  // progress
  var height = 330;
  var relation = height / total;
  let interval = setInterval(() => {
    height = height - relation;
    $("[progress]").height(height);
    $("[time-percentage]").text(parseInt(relation / 100));
  }, 1000);
};

$(() => {
  create_quiz();
});
