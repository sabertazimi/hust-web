const slides = document.querySelectorAll('.slide');
const select = document.querySelector('.animation-select');

select.addEventListener('change', (event) => {
  slides.forEach((slide) => {
    slide.className = '';
    slide.classList.add('slide');
    slide.classList.add(`slide--${event.target.value}`);
  });
});
