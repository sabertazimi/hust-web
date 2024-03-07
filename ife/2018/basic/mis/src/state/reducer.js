import sourceData from '../data'
import { FILTER_ALL, FILTER_DATA, SHOW_ALL } from './constants'

const initialFilters = {
  region: ['north', 'south', 'east'],
  product: ['phone', 'laptop', 'smart speaker'],
}

const initialState = {
  type: 'all',
  filters: { ...initialFilters },
  data: sourceData,
}

const getDataWithFilters = (data, filters) =>
  data.filter(item =>
    Object.keys(filters)
      .map(key => filters[key].includes(item[key]))
      .every(Boolean)
  )

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALL: {
      const { field } = action.payload
      const { filters } = state
      filters[field] = initialFilters[field]
      const data = getDataWithFilters(sourceData, filters)

      return {
        ...state,
        filters,
        data,
      }
    }
    case FILTER_ALL: {
      const { field } = action.payload
      const { filters } = state
      filters[field] = []
      const data = getDataWithFilters(sourceData, filters)

      return {
        ...state,
        filters,
        data,
      }
    }
    case FILTER_DATA: {
      const { field, filter } = action.payload
      const { filters } = state
      filters[field] = [...filter]
      const data = getDataWithFilters(sourceData, filters)

      return {
        ...state,
        filters,
        data,
      }
    }
    default:
      return state
  }
}

export default reducer
