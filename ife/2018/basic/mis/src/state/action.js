import { FILTER_ALL, FILTER_DATA, SHOW_ALL } from './constants'

function createAction(type, ...args) {
  switch (type) {
    case SHOW_ALL:
    case FILTER_ALL:
      return {
        type,
        payload: {
          field: args[0],
        },
      }
    case FILTER_DATA: {
      const [field, filter] = args

      return {
        type,
        payload: {
          field,
          filter,
        },
      }
    }
    default:
      return {
        type: undefined,
        payload: new Error('Unknown action type'),
        error: true,
      }
  }
}

export default createAction
