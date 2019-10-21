import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import { GRAPHQL_URI } from './config';
import Auth from './auth';
import * as serviceWorker from './serviceWorker';
import './index.css';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  credentials: 'include',
  request: operation => {
    const accessToken = Auth.getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `jwt ${accessToken}`
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();
