let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    dispalyEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
};

const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
};

const dispalyEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTime.textContent = `Be Back At ${hours}:${mins < 10 ? '0' : ''}${mins}`;
};

const startTimer = function(event) {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
};

const startCustomTimer = function(event) {
    event.preventDefault() && event.stopPropagation();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
};

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', startCustomTimer);