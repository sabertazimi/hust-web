import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { BasicLayout, Home, Register, Login } from './components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default App;
