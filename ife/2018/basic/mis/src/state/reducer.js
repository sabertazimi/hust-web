import {
  SHOW_ALL,
  FILTER_ALL,
  FILTER_DATA,
} from './constants';

import sourceData from '../data';

const initialFilters = {
  region: ['north', 'south', 'east'],
  product: ['phone', 'laptop', 'smart speaker'],
};

const initialState = {
  type: 'all',
  mixedFilters: { ...initialFilters },
  data: sourceData,
};

const getDataWithFilters = (data, mixedFilters) => (
  data.filter(item => (
    Object.keys(mixedFilters).map(key => (
      mixedFilters[key].some(filter => item[key] === filter)
    )).every(Boolean)
  ))
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL: {
      const { field } = action.payload;
      const { mixedFilters } = state;
      mixedFilters[field] = initialFilters[field];
      const data = getDataWithFilters(sourceData, mixedFilters);

      return {
        ...state,
        mixedFilters,
        data,
      };
    }
    case FILTER_ALL: {
      const { field } = action.payload;
      const { mixedFilters } = state;
      mixedFilters[field] = [];
      const data = getDataWithFilters(sourceData, mixedFilters);

      return {
        ...state,
        mixedFilters,
        data,
      };
    }
    case FILTER_DATA: {
      const { field, filters } = action.payload;
      const { mixedFilters } = state;
      mixedFilters[field] = filters;
      const data = getDataWithFilters(sourceData, mixedFilters);

      return {
        ...state,
        mixedFilters,
        data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
