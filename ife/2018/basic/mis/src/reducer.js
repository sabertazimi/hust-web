const dataFilterFactory = reducer => (
  ($dom, data) => (data.filter(item => reducer($dom, item)))
);

const regionReducer = ($dom, item) => ($dom.options[$dom.selectedIndex].value === item.region);
const regionFilter = dataFilterFactory(regionReducer);

export {
  dataFilterFactory,
  regionFilter,
};
