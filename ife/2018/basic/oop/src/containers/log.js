const $logger = document.querySelector('.logger');
const $log = (message) => {
  if (typeof message === 'object') {
    $logger.innerHTML += `${JSON.stringify(message)}<br />`;
  } else {
    $logger.innerHTML += `${message}<br />`;
  }
};

export default $log;
