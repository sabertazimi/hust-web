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
        payload: {
          field: args[0],
        },
      };
    case FILTER_DATA:
      return {
        type,
        payload: {
          field: args[0],
          filter: args[1],
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
