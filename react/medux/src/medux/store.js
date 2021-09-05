import {
    validateAction
} from './action.js';
import {
    INIT_MEDUX
} from './constants.js';

const applyMiddleware = (...middlewares) => store => {
    // should return (next) => (action) => { ... } function
    if (middlewares.length === 0) {
        return dispatch => dispatch;
    }

    if (middlewares.length === 1) {
        return middlewares[0];
    }

    // [ (next) => (action) => {...}, ... ] array
    // next: (action) => { ... } function
    const boundMiddlewares = middlewares.map(middleware => middleware(store));

    return boundMiddlewares.reduce((a, b) => (next => a(b(next))));
};

const createStore = (reducer, middleware) => {
    // clousre for storing global state
    let state = undefined;
    const subscribers = [];
    const coreDispatch = (action) => {
        validateAction(action);
        state = reducer(state, action);
        subscribers.forEach(handler => handler());
    };
    const getState = () => state;

    const store = {
        dispatch: coreDispatch,
        getState,
        subscribe: (handler) => {
            subscribers.push(handler);

            // unsubscribe function
            return () => {
                const index = subscribers.indexOf(handler);

                if (index > 0) {
                    subscribers.splice(index, 1);
                }
            };
        }
    };

    if (middleware) {
        // store default dispatch
        const dispatch = action => store.dispatch(action);

        // const middleware = ({ dispatch, getState }) => (next) => (action) => { ... };
        // middleware is a higher-order function (return a function (action) => { ... });
        // dispatch, getState and coreDispatch are injected into middleware as arguments
        store.dispatch = middleware({
            dispatch,
            getState
        })(coreDispatch);
    }

    coreDispatch({
        type: INIT_MEDUX
    });
    return store;
};

export {
    createStore
};