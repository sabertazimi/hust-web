import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Dashboard, Form } from './components';

import './index.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
