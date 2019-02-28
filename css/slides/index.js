const slideContainer = document.querySelector('.slide-container');
const slides = document.querySelectorAll('.slide');
const select = document.querySelector('.animation-select');

// reset scrollX and scrollY when change slides
const resetScroll = () => {
  window.scrollTo(0, 0);
};

// slide change utils function
const getCurrentSlideIndex = () => {
  const { hash } = window.location;
  return Number.parseInt(hash.slice(hash.length - 1));
};

const getPrevSlideIndex = () => {
  const currentIndex = getCurrentSlideIndex();
  return currentIndex - 1 > 0 ? currentIndex - 1 : 1;
};

const getNextSlideIndex = () => {
  const currentIndex = getCurrentSlideIndex();
  return currentIndex + 1 < 6 ? currentIndex + 1 : 5;
};

const changeToSlide = (index) => {
  const { origin, pathname } = window.location;
  window.location = `${origin}${pathname}#slide${index}`;
  resetScroll();
};

const changeToPrevSlide = () => {
  changeToSlide(getPrevSlideIndex());
};

const changeToNextSlide = () => {
  changeToSlide(getNextSlideIndex());
};

// left or right arrow to browser slides
window.addEventListener('keydown', (event) => {
  const { key: keyName } = event;

  if (keyName === 'ArrowLeft' || keyName === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }

  switch (keyName) {
    case 'ArrowLeft':
      changeToPrevSlide();
      break;
    case 'ArrowRight':
      changeToNextSlide();
      break;
    default:
      break;
  }
});

// click prev/next slide link to browser slides
slideContainer.addEventListener('click', (event) => {
  if (event.target.matches('.slide-link')) {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.target.matches('.slide-prev-link')) {
      changeToPrevSlide();
    } else {
      changeToNextSlide();
    }
  }
});

// change slides animation
select.addEventListener('change', (event) => {
  changeToSlide(1);

  slides.forEach((slide) => {
    slide.className = '';
    slide.classList.add('slide');
    slide.classList.add(`slide--${event.target.value}`);
  });
});

changeToSlide(1);
