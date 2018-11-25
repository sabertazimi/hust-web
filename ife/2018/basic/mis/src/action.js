import {
  SHOW_ALL,
  FILTER_ALL,
  FILTER_DATA,
} from './constants';

const createAction = (type, ...args) => {
  switch (type) {
    case SHOW_ALL:
    case FILTER_ALL:
      return {
        type,
      };
    case FILTER_DATA:
      return {
        type,
        payload: {
          filterField: args[0],
          filters: args[1],
        },
      };
    default:
      return {
        type: undefined,
        payload: new Error('Unknown action type'),
        error: true,
      };
  }
};

export default createAction;
