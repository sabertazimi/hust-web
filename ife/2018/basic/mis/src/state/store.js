import reducer from './reducer';

const createStore = _reducer => {
  // clousre for storing global state
  let state;

  // subscribe to `dispatch` event
  const subscribers = [];

  const coreDispatch = action => {
    state = _reducer(state, action);
    subscribers.forEach(handler => handler());
  };

  const getState = () => state;

  const store = {
    dispatch: coreDispatch,
    getState,
    subscribe: handler => {
      if (!subscribers.includes(handler)) {
        subscribers.push(handler);
      }

      // unsubscribe function
      return () => {
        const index = subscribers.indexOf(handler);

        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      };
    },
  };

  // initialize state
  coreDispatch({
    type: 'MIS_INIT',
  });

  return store;
};

const store = createStore(reducer);

export default store;
