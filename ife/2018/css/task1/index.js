const switchButton = document.querySelector('.button-switch');
const menuButton = document.querySelector('.button-menu');

switchButton.addEventListener('click', () => {
  menuButton.classList.toggle('button-menu-enable');
});

menuButton.addEventListener('transitionend', event => {
  if (event.propertyName === 'width') {
    menuButton.classList.toggle('button-menu-blue');
  }
});
