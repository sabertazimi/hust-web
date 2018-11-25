import {
  $regionFilter,
  $table,
} from './dom';

import data from './data';

import {
  regionFilter,
} from './reducer';

import {
  renderTable,
} from './render';

import './index.scss';

const renderTableWithRegionFiler = () => {
  const filteredData = regionFilter($regionFilter, data);
  const renderedTable = renderTable(filteredData);
  $table.innerHTML = renderedTable;
};

$regionFilter.addEventListener('change', renderTableWithRegionFiler);

renderTableWithRegionFiler();
