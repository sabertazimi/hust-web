import React from 'react';
import ReactDOM from 'react-dom';

import {
    Provider
} from './medux';

import store from './store.js';
import App from './App.js';

import './index.css';

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));