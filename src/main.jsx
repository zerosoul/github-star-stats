import ReactDOM from "react-dom/client";
import { ApolloClient } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider, HttpLink } from '@apollo/client';

import App from './App';
import GlobalStyle from './Global.style';

// import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN';
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // 根目录 .env 读取 or cli 环境变量
  const token = import.meta.env.VITE_G_TOKEN || '';
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
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </>
);

