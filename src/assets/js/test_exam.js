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
      choices: ["dsvsfbsdfdgn", "fbfddbdb", "fdbfbdbd", "dfbdbdbd"],
    },
    {
      id: "fbf5b16",
      question: "کدام گزینه صحیح است؟",
      choices: ["dsdvsvsf", "svssfbsfbfsb", "sfbfbsfbf", "sfbfbfbwb"],
    },
    {
      id: "613fsbfb",
      question: "کدام گزینه صحیح است؟",
      choices: ["vrbrwb", "fbdbbteb", "fvfbbw", "wvwwbwrbwb"],
    },
  ],
  options: {
    id: "13s5v13sfb",
    name: "آزمون رشته انتخابی",
    total_time: 1000,
    time_per_question: 100,
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
    let choice_data = btoa(a).toString();
    let choices_el = ` 
    <div class="relative">
    <label class="container relative">
  ${a}
<input type="radio" name="${q.id}" data="${choice_data}"  />
<span class="checkmark"></span>
</label>

<button data="undo_${choice_data}" onclick="undo_answer(this,'${q.id}')"
 class=" hidden absolute top-1 left-1 mdi mdi-close flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm text-red active:scale-90" undo_answer_btn ></button>
  </div>
`;
    $(`#${q.id} choices`).append(choices_el);
  });
  $("input").change((e) => post_answer($(e.currentTarget).attr("data"), $("single-question").attr("id")));
};

const create_question = (q, i) => {
  let question_el = `<single-question class="flex flex-col justify-between gap-5" id="${q.id}">
  <question>
    <h2>${i + 1 + "- " + q.question}</h2>
  </question>
  <choices class="relative">
  </choices>
  </single-question>`;

  $("exam").append(question_el);
  create_choices(q);
  question_index.set(i);
};

const create_quiz = () => {
  if (sample_quiz.options.time_per_question) {
    create_question(sample_quiz.questions[0], 0);
    question_index.set(0);
    question_timer.set();
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
  const q = sample_quiz.questions;
  const i = question_index.get();
  remove_question(q[i].id);
  question_index.set(i + 1);
  create_question(q[question_index.get()], question_index.get());
  question_timer.stop();
  question_timer.set();
  if (!(question_index.get() < q.length - 1)) {
    $("#next_question_btn, #submit_exam_btn").slideToggle();
  }
};

const quiz_timer = () => {
  let total = sample_quiz.options.total_time;
  let timer = new easytimer.Timer({countdown: true, startValues: {seconds: 0}});

  timer.start({startValues: {seconds: total}, target: {seconds: 0}});
  $("[total-time]").html(timer.getTimeValues().toString());

  timer.addEventListener("secondsUpdated", function (e) {
    $("[total-time]").html(timer.getTimeValues().toString());
  });

  timer.addEventListener("targetAchieved", function (e) {
    clearInterval(interval);
    $("[progress]").height(0);
    $("[time-percentage]").html(0);
  });

  // progress
  let height = 330,
    step = height / total,
    percentage = 100,
    percentage_step = 100 / total,
    interval = setInterval(() => {
      height = height - step;
      $("[progress]").height(height);
      percentage = percentage - percentage_step;
      $("[time-percentage]").html(parseInt(percentage));
    }, 1000);
};

const question_timer = {
  question_time: sample_quiz.options.time_per_question,
  timer: new easytimer.Timer({countdown: true, startValues: {seconds: 0}}),

  get() {
    return this.timer;
  },

  set() {
    this.timer.start({startValues: {seconds: this.question_time}, target: {seconds: 0}});
    $("[single-question-timer]").html(this.timer.getTimeValues().toString());

    this.timer.addEventListener("secondsUpdated", function (e) {
      $("[single-question-timer]").html(question_timer.timer.getTimeValues().toString());
    });

    this.timer.addEventListener("targetAchieved", function (e) {
      $("[single-question-timer]").html("00:00:00");
      if (!(question_index.get() >= sample_quiz.questions.length - 1)) {
        next_question();
      } else {
      }
    });
  },

  stop() {
    this.timer.stop();
    this.timer.removeAllEventListeners();
  },
};

const single_answer = {
  quiz_info: {
    quiz_id: sample_quiz.options.id,
    name: sample_quiz.options.name,
  },
  answer: {
    question_id: "",
    selected_choice: "",
  },
};

const post_answer = (choice_data, question_id) => {
  $("[undo_answer_btn]").addClass("hidden");
  $(`[data="undo_${choice_data}"]`).removeClass("hidden");
  single_answer.answer.question_id = question_id;
  single_answer.answer.selected_choice = choice_data;
  // console.log(single_answer);
};

const undo_answer = (undo_btn, question_id) => {
  $(undo_btn).addClass("hidden");
  $(undo_btn).parent().find("input").prop("checked", false);
};

$(() => {
  create_quiz();
});
