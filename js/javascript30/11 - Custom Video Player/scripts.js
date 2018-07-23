const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const isBuffered = (time) => {
    return (time < video.buffered.end(0));
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

    if (video.buffered.length === 1) {
        const buf = video.buffered;
        console.group('Buffer Time');
        console.log(buf.end(0));
        console.log(video.duration);
        console.groupEnd();
    }
};

const onScrub = function(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    isBuffered(scrubTime) && (video.currentTime = scrubTime);
};

video.addEventListener('click', onToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', onProgress);

let mousedown = false;

progress.addEventListener('click', onScrub);
progress.addEventListener('mousemove', (event) => mousedown && onScrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

toggleButton.addEventListener('click', onToggle);
skipButtons.forEach(button => button.addEventListener('click', onSkip));
ranges.forEach(slider => slider.addEventListener('change', onSlide));
