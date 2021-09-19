import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './auth';
import { GRAPHQL_URI, SERVER_URL } from './config';
import './index.css';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id }),
    },
  },
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
                authorization: `jwt ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
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
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
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
          credentials: 'include',
        });
      },
      handleFetch: accessToken => {
        Auth.setAccessToken(accessToken);
      },
      handleError: err => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
      },
    }) as unknown as ApolloLink,
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
      credentials: 'include',
    }),
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client as unknown as any}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
