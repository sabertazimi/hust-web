import store from '../state/store';

const { getState } = store;

const generateHeader = headers => {
  const headersHTML = headers.map(header => `<th>${header}</th>`).join('');

  return `
    <tr>
      ${headersHTML}
    </tr>
  `;
};

const generateRow = ({ product, region, sales }, rowspan = 1) => {
  const productHTML =
    rowspan === 0 ? '' : `<td rowspan="${rowspan}">${product}</td>`;
  const regionHTML = `<td>${region}</td>`;
  // use `data-row` and `data-column` to locate cells
  // const { currentTarget: { dataset: { row, column }}} = event;
  const salesHTML = sales
    .map(
      sale =>
        `<td contenteditable class="right">${sale
          .toString(10)
          .padStart(3)}</td>`
    )
    .join('');

  return `
    <tr>
      ${productHTML}
      ${regionHTML}
      ${salesHTML}
    </tr>
  `;
};

const generateTable = data => {
  const sortedData = data.sort((a, b) => {
    if (a.product < b.product) return -1;

    if (a.product === b.product) {
      if (a.region < b.region) return -1;
      if (a.region === b.region) return 0;
    }

    return 1;
  });
  const months = [...Array.from(Array(12).keys())].map(number => number + 1);
  const headersHTML = generateHeader(['product', 'region', ...months]);
  const bodyHTML = sortedData
    .map((item, index, array) => {
      if (index === 0 || array[index - 1].product !== item.product) {
        const rowspan = array.reduce(
          (acc, cur) => acc + Number(item.product === cur.product),
          0
        );
        return generateRow(item, rowspan);
      }

      return generateRow(item, 0);
    })
    .join('');

  return `
    ${headersHTML}
    ${bodyHTML}
  `;
};

const renderTable = $table => {
  $table.innerHTML = generateTable(getState().data);
};

export default renderTable;
