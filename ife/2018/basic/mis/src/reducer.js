const dataFilterFactory = reducer => (
  ($dom, data) => (data.filter(item => reducer($dom, item)))
);

const regionReducer = ($dom, item) => {
  const { value } = $dom.options[$dom.selectedIndex];

  if (value === 'all') return true;
  return (value === item.region);
};
const regionFilter = dataFilterFactory(regionReducer);

const productReducer = ($dom, item) => {
  const { value } = $dom.options[$dom.selectedIndex];

  if (value === 'all') return true;
  return (value === item.product);
};
const productFilter = dataFilterFactory(productReducer);

export {
  dataFilterFactory,
  regionFilter,
  productFilter,
};
