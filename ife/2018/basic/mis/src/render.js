const renderHeader = (headers) => {
  const headersHTML = headers.map(header => `<th>${header}</th>`).join('');

  return (`
    <tr>
      ${headersHTML}
    </tr>
  `);
};

const renderRow = ({
  product,
  region,
  sales,
}) => {
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

const renderTable = (data) => {
  const months = [...Array.from(Array(12).keys())].map(number => (number + 1));
  const headersHTML = renderHeader(['product', 'region', ...months]);
  const bodyHTML = data.map(item => renderRow(item)).join('');

  return (`
    ${headersHTML}
    ${bodyHTML}
  `);
};

const renderCheckBoxes = (schema) => {
  const { label, data } = schema;

  const labelHTML = `${label}: `;
  const checkAllBoxHTML = (`
    <input type="checkbox" id="${label}-all" name="${label}" value="all">
    <label for="${label}-all">All</label>
  `);
  const checkBoxesHTML = data.map(({ value, text }) => (`
    <input type="checkbox" id="${label}-${value}" name="${label}" value="${value}">
    <label for="${label}-${value}">${text}</label>
  `)).join('');

  return (`
    ${labelHTML}
    ${checkAllBoxHTML}
    ${checkBoxesHTML}
  `);
};

export {
  renderTable,
  renderCheckBoxes,
};
