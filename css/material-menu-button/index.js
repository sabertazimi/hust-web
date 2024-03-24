const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-button');

const toggleMenu = () => {
  menu.classList.toggle('menu-open');
  menuButton.setAttribute(
    'aria-expanded',
    menuButton.getAttribute('aria-expanded') !== 'true'
  );
};

const toggleTimer = setInterval(() => {
  toggleMenu();
}, 2000);

menuButton.addEventListener('click', () => {
  clearInterval(toggleTimer);
  toggleMenu();
});
