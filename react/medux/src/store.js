import {
    createStore
} from './medux';

import reducer from './reducer.js';

const store = createStore(reducer);

export default store;