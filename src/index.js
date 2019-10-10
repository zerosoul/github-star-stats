import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';

import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from '@apollo/react-hooks';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'd6bcf9ccaf571bbae2bb21a773036f8d304153d2';
  // const token = localStorage.getItem('AUTH_TOKEN');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'https://api.github.com/graphql' })),
  cache: new InMemoryCache()
});

import App from './App';
import GlobalStyle from './Global.style';

import register from './registerServiceWorker';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </>,
  document.getElementById('root')
);

register();
