import { renderCheckBoxes, renderTable } from './components';

import { $productFilter, $regionFilter, $table } from './containers';

import store from './state/store';

import './index.css';

renderCheckBoxes($regionFilter, 'region', {
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

renderCheckBoxes($productFilter, 'product', {
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

renderTable($table);

const { subscribe } = store;

subscribe(() => {
  renderTable($table);
});
