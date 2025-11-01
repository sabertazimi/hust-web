const cursor = document.querySelector('#cursor');

window.addEventListener('mousemove', (event) => {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
});
