let LOG_ID = 0;

const $logger = document.querySelector('.logger');

const $log = message => {
  if (!message) {
    $logger.innerHTML += '<br />';
  } else if (typeof message === 'object') {
    LOG_ID += 1;
    const LOG_ID_STR = LOG_ID.toString(10).padStart(2, '0');
    $logger.innerHTML += `[${LOG_ID_STR}] ${JSON.stringify(message)}<br />`;
  } else {
    LOG_ID += 1;
    const LOG_ID_STR = LOG_ID.toString(10).padStart(2, '0');
    $logger.innerHTML += `[${LOG_ID_STR}] ${message}<br />`;
  }
};

export default $log;
