import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  BasicLayout,
  Home,
  Register,
  Login,
  Agreement,
  ForgotPassword,
  Dashboard,
} from './components';

const Routes: React.FC = () => {
  const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/agreement', component: Agreement },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/dashboard', component: Dashboard },
  ];

  return (
    <BrowserRouter>
      <BasicLayout>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default Routes;
