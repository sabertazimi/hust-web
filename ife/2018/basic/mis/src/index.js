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
  renderCheckBox,
} from './render';

import './index.scss';

$regionFilter.innerHTML = renderCheckBox($regionFilter, {
  label: 'Region',
  data: [
    {
      value: 'north',
      text: 'north',
    },
    {
      value: 'south',
      text: 'south',
    },
    {
      value: 'east',
      text: 'east',
    },
  ],
});

$productFilter.innerHTML = renderCheckBox($productFilter, {
  label: 'Product',
  data: [
    {
      value: 'phone',
      text: 'phone',
    },
    {
      value: 'laptop',
      text: 'laptop',
    },
    {
      value: 'smart speaker',
      text: 'smart speaker',
    },
  ],
});

const renderTableWithFilter = () => {
  const renderedTable = renderTable(data);
  $table.innerHTML = renderedTable;
};

$regionFilter.addEventListener('change', renderTableWithFilter);
$productFilter.addEventListener('change', renderTableWithFilter);

renderTableWithFilter();
