import store from '../state/store';

const { getState } = store;

const generateHeader = (headers) => {
  const headersHTML = headers.map(header => `<th>${header}</th>`).join('');

  return (`
    <tr>
      ${headersHTML}
    </tr>
  `);
};

const generateRow = ({
  product,
  region,
  sales,
}) => {
  // const { mixedFilters } = getState();
  // console.log(mixedFilters);

  const productHTML = `<td>${product}</td>`;
  const regionHTML = `<td>${region}</td>`;
  const salesHTML = sales.map(sale => `<td class="right">${sale.toString(10).padStart(3)}</td>`).join('');

  return (`
    <tr>
      ${productHTML}
      ${regionHTML}
      ${salesHTML}
    </tr>
  `);
};

const generateTable = (data) => {
  const months = [...Array.from(Array(12).keys())].map(number => (number + 1));
  const headersHTML = generateHeader(['product', 'region', ...months]);
  const bodyHTML = data.map(item => generateRow(item)).join('');

  return (`
    ${headersHTML}
    ${bodyHTML}
  `);
};

const renderTable = ($table) => {
  const generatedTable = generateTable(getState().data);
  /* eslint-disable */
  $table.innerHTML = generatedTable;
  /* eslint-enable */
};

export default renderTable;
