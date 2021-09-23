import { LOGIN, ADD_FRIEND, DELETE_FRIEND, SEND_MESSAGE } from './types';

const initialState = {
  username: '',
  email: '',
  friends: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOGIN: {
      const { username, email, friends } = action.payload;

      return {
        ...state,
        username,
        email,
        friends,
      };
    }
    case ADD_FRIEND: {
      return state;
    }
    case DELETE_FRIEND: {
      return state;
    }
    case SEND_MESSAGE: {
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
