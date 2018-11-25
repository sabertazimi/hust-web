import {
  SHOW_ALL,
  FILTER_ALL,
  FILTER_DATA,
} from '../state/constants';

import createAction from '../state/action';
import store from '../state/store';

const { dispatch } = store;

const generateCheckBoxes = (schema) => {
  const { label, data } = schema;

  const labelHTML = `${label}: `;
  const checkAllBoxHTML = (`
    <input type="checkbox" id="${label}-all" name="${label}" value="all" checked>
    <label for="${label}-all">All</label>
  `);
  const checkBoxesHTML = data.map(({ value, text }) => (`
    <input type="checkbox" id="${label}-${value}" name="${label}" value="${value}" checked>
    <label for="${label}-${value}">${text}</label>
  `)).join('');

  return (`
    ${labelHTML}
    ${checkAllBoxHTML}
    ${checkBoxesHTML}
  `);
};

const handleCheckBoxes = ($container, filterField, event) => {
  const [allCheckBox, ...checkBoxes] = Array.from($container.querySelectorAll('input[type="checkbox"]'));

  if (event.target.value.includes('all')) {
    const { checked } = allCheckBox;

    checkBoxes.forEach((checkbox) => {
      /* eslint-disable */
      checkbox.checked = checked;
      /* eslint-enable */
    });

    dispatch(createAction(checked ? SHOW_ALL : FILTER_ALL));
  } else {
    const filters = [];

    checkBoxes.forEach((checkbox) => {
      if (checkbox.checked) {
        filters.push(checkbox.value);
      }
    });

    dispatch(createAction(FILTER_DATA, filterField, filters));
  }
};

const renderCheckBoxes = ($container, filterField, schema) => {
  /* eslint-disable */
  $container.innerHTML = generateCheckBoxes(schema);
  /* eslint-enable */
  $container.addEventListener('change', event => handleCheckBoxes($container, filterField, event));
};

export default renderCheckBoxes;
