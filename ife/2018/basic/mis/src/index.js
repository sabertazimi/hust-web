import {
  $regionFilter,
  $productFilter,
  $table,
} from './dom';

import {
  generateTable,
  generateCheckBoxes,
} from './render';

import {
  SHOW_ALL,
  FILTER_ALL,
  FILTER_DATA,
} from './constants';

import createAction from './action';
import store from './store';

import './index.scss';

$regionFilter.innerHTML = generateCheckBoxes({
  label: 'Region',
  data: [
    {
      value: 'north',
      text: 'North',
    },
    {
      value: 'south',
      text: 'South',
    },
    {
      value: 'east',
      text: 'East',
    },
  ],
});

$productFilter.innerHTML = generateCheckBoxes({
  label: 'Product',
  data: [
    {
      value: 'phone',
      text: 'Phone',
    },
    {
      value: 'laptop',
      text: 'Laptop',
    },
    {
      value: 'smart speaker',
      text: 'Smart Speaker',
    },
  ],
});

const {
  getState,
  dispatch,
  subscribe,
} = store;

// const isAllChecked = (checkBoxes) => {

// };

const handleCheckBoxes = ($container, filterField, event) => {
  const [allCheckBox, ...checkBoxes] = Array.from($container.querySelectorAll('input[type="checkbox"]'));

  if (event.target.value.includes('all')) {
    if (allCheckBox.checked) {
      checkBoxes.forEach((checkbox) => {
        /* eslint-disable */
        checkbox.checked = true;
        /* eslint-enable */
      });

      dispatch(createAction(SHOW_ALL));
    } else {
      checkBoxes.forEach((checkbox) => {
        /* eslint-disable */
        checkbox.checked = false;
        /* eslint-enable */
      });

      dispatch(createAction(FILTER_ALL));
    }
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

$regionFilter.addEventListener('change', event => handleCheckBoxes($regionFilter, 'region', event));
$productFilter.addEventListener('change', event => handleCheckBoxes($productFilter, 'product', event));

subscribe(() => {
  const generatedTable = generateTable(getState().data);
  $table.innerHTML = generatedTable;
});

const generatedTable = generateTable(getState().data);
$table.innerHTML = generatedTable;
