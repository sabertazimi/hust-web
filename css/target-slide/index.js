const slides = document.querySelectorAll('.slide');
const select = document.querySelector('.animation-select');

const changeToSlide = (index) => {
  const { origin, pathname } = window.location;
  window.location = `${origin}${pathname}#slide${index}`;
}

select.addEventListener('change', (event) => {
  changeToSlide(1);

  slides.forEach((slide) => {
    slide.className = '';
    slide.classList.add('slide');
    slide.classList.add(`slide--${event.target.value}`);
  });
});

changeToSlide(1);
