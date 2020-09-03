const switchButton = document.querySelector('.button__switch');
const menuButton = document.querySelector('.button__menu');

switchButton.addEventListener('click', () => {
  menuButton.classList.toggle('button__menu--enable');
});

menuButton.addEventListener('transitionend', (event) => {
  if (event.propertyName === 'width') {
    menuButton.classList.toggle('button__menu--blue');
  }
});
