const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const bufferBar = player.querySelector('.progress__buffered');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const isBuffered = (time) => {
    if (video.buffered.length > 0) {
        return (time < video.buffered.end(0));
    }

    return false;
};

const onToggle = function(event) {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
};

const updateButton = function(event) {
    const text = this.paused ? '►' : '❚❚';
    toggleButton.textContent = text;
};

const onSkip = function(event) {
    skippedTime = video.currentTime + parseFloat(this.dataset.skip);
    isBuffered(skippedTime) && (video.currentTime = skippedTime);
};

const onSlide = function(event) {
    video[this.name] = this.value;
};

const onProgress = function(event) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

    if (video.buffered.length > 0) {
        const bufferedPercent = (video.buffered.end(0) - video.currentTime) / video.duration * 100;
        bufferBar.style.flexBasis = `${bufferedPercent}%`;
    }
};

const onScrub = function(event) {
    // fix offset when clicking on buffered bar
    const offset = event.target.classList.contains('progress__buffered') ? progressBar.offsetWidth : 0;
    const scrubTime = (event.offsetX + offset) / progress.offsetWidth * video.duration;
    isBuffered(scrubTime) && (video.currentTime = scrubTime);
};

video.addEventListener('click', onToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('canplay', onProgress);
video.addEventListener('timeupdate', onProgress);

let mousedown = false;

progress.addEventListener('click', onScrub);
progress.addEventListener('mousemove', (event) => mousedown && onScrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toggleButton.addEventListener('click', onToggle);
skipButtons.forEach(button => button.addEventListener('click', onSkip));
ranges.forEach(slider => slider.addEventListener('change', onSlide));
