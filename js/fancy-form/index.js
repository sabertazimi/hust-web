// DOM Elements
const root = document.documentElement;
const successColor = getComputedStyle(root).getPropertyValue('--success');
const infoColor = getComputedStyle(root).getPropertyValue('--info');
const warningColor = getComputedStyle(root).getPropertyValue('--warning');
const dangerColor = getComputedStyle(root).getPropertyValue('--danger');

const formBox = document.querySelector('.form-box');
const prevBtn = formBox.querySelector('.prev-btn');
const nextBtn = formBox.querySelector('.next-btn');
const formGroup = formBox.querySelector('.form-group');
const formLabel = formGroup.querySelector('.form-label');
const formInput = formGroup.querySelector('.form-control');
const formProgress = formGroup.querySelector('.form-progress');
const progressBar = formBox.querySelector('.progress-bar');
const loadingIcon = document.querySelector('.loading-icon');
const endIcon = document.querySelector('.end-icon');

// Global Config
const questions = [
  {
    question: 'Enter Your First Name',
    type: 'text',
  },
  {
    question: 'Enter Your Last Name',
    type: 'text',
  },
  {
    question: 'Enter Your Email',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
  },
  {
    question: 'Create A Password',
    type: 'password',
  },
];

const shakeTime = 500;
const switchTime = 500;
let currentQuestion = -1;

// Question Util Functions
const setQuestion = (index) => {
  formLabel.textContent = questions[index].question;
  formInput.type = questions[index].type || 'text';
  formInput.value = '';
  formInput.focus();
};

const showQuestion = () => {
  formGroup.style.opacity = 1;
  formProgress.style.width = '100%';
  formProgress.style.transition = 'width 0.6s ease-in-out';
};

const hiddenQuestion = () => {
  formGroup.style.opacity = 0;
  formProgress.style.width = 0;
  formProgress.style.transition = 'none';
};

const renderUI = (index) => {
  prevBtn.className = index ? 'fa fa-arrow-left prev-btn' : 'fa fa-user prev-btn';
  progressBar.style.width = `${(index * 100) / questions.length}%`;
};

const renderQuestion = (index) => {
  hiddenQuestion();
  setQuestion(currentQuestion);

  setTimeout(() => {
    showQuestion();
    renderUI(currentQuestion);
  }, switchTime);
};

const completeQuestions = () => {
  formBox.classList.add('close');
  setTimeout(() => {
    loadingIcon.classList.remove('hidden');
    loadingIcon.classList.add('show');
    loadingIcon.classList.add('animate');

    setTimeout(() => {
      loadingIcon.classList.remove('show');
      loadingIcon.classList.add('hidden');
      endIcon.classList.remove('hidden');
      endIcon.classList.add('show');
    }, 3000);
  }, 1000);
};

const prevQuestion = () => {
  currentQuestion -= 1;
  renderQuestion(currentQuestion);
};

const nextQuestion = () => {
  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    completeQuestions();
    return;
  }

  renderQuestion(currentQuestion);
};

const validate = () => {
  if (!formInput.value.match(questions[currentQuestion].pattern || /.+/)) {
    formBox.classList.add('animate');
    setTimeout(() => formBox.classList.remove('animate'), shakeTime);
    formInput.focus();
  } else {
    nextQuestion();
  }
};

// DOM Events
formInput.addEventListener('focusin', () => {
  formLabel.classList.add('shrink');
});

formBox.addEventListener('focusout', () => {
  formLabel.classList.remove('shrink');
});

prevBtn.addEventListener('click', () => prevQuestion());
nextBtn.addEventListener('click', () => validate());

window.addEventListener('keypress', (evnet) => {
  const { key: keyName } = event;

  if (keyName === 'Enter' || keyName === 'ArrowLeft' || keyName === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();

    switch (keyName) {
      case 'Enter': // fall through
      case 'ArrowRight':
        validate();
        break;
      case 'ArrowLeft':
        prevQuestion();
        break;
      default:
        break;
    }
  }
});


const main = () => {
  nextQuestion();
};

main();
