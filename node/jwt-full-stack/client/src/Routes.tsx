import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  BasicLayout,
  Home,
  Register,
  Login,
  Agreement,
  ForgotPassword,
  Dashboard,
} from './components';

const AppRoutes: React.FC = () => {
  const routes = [
    { path: '/', element: Home },
    { path: 'register', element: Register },
    { path: 'login', element: Login },
    { path: 'agreement', element: Agreement },
    { path: 'forgot-password', element: ForgotPassword },
    { path: 'dashboard', element: Dashboard },
  ];

  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
