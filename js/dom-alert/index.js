const container = document.querySelector('.container');
const header = document.querySelector('.header');

const showAlert = (type, message, duration = 2) => {
  const div = document.createElement('div');

  // add basic style and message
  // append to container
  div.className = `alert alert--${type}`;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, header);

  // fade in animation
  div.classList.add('alert--before-enter');

  setTimeout(() => {
    div.classList.remove('alert--before-enter');
    div.classList.add('alert--enter');
  }, 20);

  // self-destroy lifecycle
  setTimeout(() => {
    // fade out animation
    div.classList.remove('alert--enter');
    div.classList.add('alert--leave');

    div.addEventListener('transitionend', () => {
      if (event.propertyName === 'opacity') {
        // self-destroy
        div.remove();
      }
    });
  }, duration * 1000);
};

const showAlerts = () => {
  showAlert('success', 'Success Message');
  showAlert('warning', 'Warning Message');
  showAlert('danger', 'Danger Message');
  showAlert('info', 'Info Message');
};

container.addEventListener('click', () => {
  showAlerts();
});

window.addEventListener('load', () => {
  showAlerts();
});
