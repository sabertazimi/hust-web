import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';
import App from './App';
import { SERVER_URL, GRAPHQL_URI } from './config';
import Auth from './auth';
import * as serviceWorker from './serviceWorker';
import './index.css';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id })
    }
  }
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;

      Promise.resolve(operation)
        .then(operation => {
          const accessToken = Auth.getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `jwt ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        // Indicates the current state of access token expiration.
        // If token not yet expired or user doesn't have a token (guest)
        // true should be returned
        const token = Auth.getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            // expired
            return false;
          } else {
            // valid
            return true;
          }
        } catch (err) {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(`${SERVER_URL}/refresh_token`, {
          method: 'POST',
          credentials: 'include'
        });
      },
      handleFetch: accessToken => {
        Auth.setAccessToken(accessToken);
      },
      handleError: err => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    requestLink,
    new HttpLink({
      uri: GRAPHQL_URI,
      credentials: 'include'
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();
