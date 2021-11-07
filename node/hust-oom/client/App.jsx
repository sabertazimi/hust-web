import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Form, Dashboard } from './components';

import './index.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
