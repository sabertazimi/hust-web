import {
  SHOW_ALL,
  FILTER_ALL,
  FILTER_DATA,
} from './constants';

import sourceData from '../data';

const initialState = {
  filterField: 'all',
  filters: 'all',
  data: sourceData,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL: {
      return {
        ...state,
        filters: [],
        data: sourceData,
      };
    }
    case FILTER_ALL: {
      return {
        ...state,
        filterField: 'all',
        data: [],
      };
    }
    case FILTER_DATA: {
      const { filterField, filters } = action.payload;
      const data = sourceData.filter(item => (
        filters.some(filter => item[filterField] === filter)
      ));

      return {
        ...state,
        filterField,
        filters,
        data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
