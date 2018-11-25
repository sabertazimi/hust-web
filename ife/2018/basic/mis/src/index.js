import {
  $regionFilter,
  $productFilter,
  $table,
} from './dom';

import data from './data';

// import {
//   regionFilter,
//   productFilter,
// } from './reducer';

import {
  renderTable,
  renderCheckBoxes,
} from './render';

import './index.scss';

$regionFilter.innerHTML = renderCheckBoxes({
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

$productFilter.innerHTML = renderCheckBoxes({
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

const handleCheckBoxes = ($container, event) => {
  const checkBoxes = Array.from($container.querySelectorAll('input[type="checkbox"]'));
  const el = event.target;

  if (el.value.includes('all')) {
    // reverse manipulation due to event bubble
    if (el.checked) {
      checkBoxes.forEach((checkbox) => {
        /* eslint-disable */
        if (!checkbox.checked) checkbox.checked = true;
        /* eslint-enable */
      });

      const renderedTable = renderTable(data);
      $table.innerHTML = renderedTable;
    } else {
      checkBoxes.forEach((checkbox) => {
        /* eslint-disable */
        if (checkbox.checked) checkbox.checked = false;
        /* eslint-enable */
      });

      const renderedTable = renderTable([]);
      $table.innerHTML = renderedTable;
    }
  } else {
    console.log(el);
  }
};

$regionFilter.addEventListener('change', event => handleCheckBoxes($regionFilter, event));
$productFilter.addEventListener('change', event => handleCheckBoxes($productFilter, event));

const renderedTable = renderTable([]);
$table.innerHTML = renderedTable;
