import { ADD_FRIEND, DELETE_FRIEND, LOGIN, SEND_MESSAGE } from './types'

const actions = {
  login(...args) {
    return {
      type: LOGIN,
      payload: {
        ...args[0],
      },
    }
  },
  addFriend(...args) {
    return {
      type: ADD_FRIEND,
      payload: {
        username: args[0],
      },
    }
  },
  deleteFriend(...args) {
    return {
      type: DELETE_FRIEND,
      payload: {
        username: args[0],
      },
    }
  },
  sendMessage(...args) {
    return {
      type: SEND_MESSAGE,
      payload: {
        username: args[0],
        message: args[1],
      },
    }
  },
}

export default actions
