import {
  $regionFilter,
  $productFilter,
  $table,
} from './dom';

import data from './data';

import {
  regionFilter,
  productFilter,
} from './reducer';

import {
  renderTable,
} from './render';

import './index.scss';

const renderTableWithFilter = () => {
  const filteredData = productFilter($productFilter, regionFilter($regionFilter, data));
  const renderedTable = renderTable(filteredData);
  $table.innerHTML = renderedTable;
};

$regionFilter.addEventListener('change', renderTableWithFilter);
$productFilter.addEventListener('change', renderTableWithFilter);

renderTableWithFilter();
