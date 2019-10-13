import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = '20c921b7d83c3cf665322fc05fadf5827c03a764';
  // const token = localStorage.getItem('AUTH_TOKEN');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
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
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </>,
  document.getElementById('root')
);

register();
