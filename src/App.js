import React, { lazy, Suspense, useState, useEffect } from 'react';
import { message, Modal, notification } from 'antd';
import styled from 'styled-components';
import { useStarTotal, useStars, useLimit } from './hooks';
import { getAvators, getQueryValue } from './utils';
import Loading from './components/Loading';
const Tabs = lazy(() => {
  return import('./containers/Tabs');
});
const AvatorWall = lazy(() => {
  return import('./components/AvatorWall');
});
const Header = lazy(() => {
  return import('./components/Header');
});
const Footer = lazy(() => {
  return import('./components/Footer');
});
message.config({
  duration: 2,
  maxCount: 1,
  top: 80
});
notification.config({
  placement: 'bottomRight'
});
const ModalInfoWrapper = styled.div`
  > p {
    margin-bottom: 1.4rem;
    > span {
      color: red;
      font-weight: 800;
      padding: 0 0.2rem;
    }
  }
`;
const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [url, setUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { gameover, resetDate } = useLimit();
  const { total, getTotalCount } = useStarTotal();
  const { repo, startLoadStars, data, loading, finished, error } = useStars();

  useEffect(() => {
    if (error) {
      let tmpMsg = '';
      const { graphQLErrors, networkError } = error;
      switch ((graphQLErrors.length && graphQLErrors[0].type) || networkError.statusCode) {
        case 401:
          tmpMsg = 'Github API Unauthorized!';
          break;
        case 'NOT_FOUND':
          tmpMsg = 'No result, check input URL please!';
          break;

        default:
          tmpMsg = 'Error';
          break;
      }
      setErrMsg(tmpMsg);
    }
  }, [error]);
  useEffect(() => {
    let tabVal = getQueryValue('tab');
    let urlVal = getQueryValue('repo');
    if (tabVal) {
      setActiveTab(tabVal);
    }
    if (urlVal) {
      setUrl(urlVal);
    }
    console.log({ tabVal, urlVal });
  }, []);

  useEffect(() => {
    if (gameover) {
      Modal.warning({
        title: 'Game Over! ',
        content: (
          <ModalInfoWrapper>
            <p>
              Today API requests remaining is <span>ZERO</span>
            </p>
            <p>
              Renew at <span>{resetDate}</span>!
            </p>
            <a href="https://developer.github.com/v4/guides/resource-limitations/">More Info</a>
          </ModalInfoWrapper>
        ),
        okText: 'Got it'
      });
    }
    return () => {
      Modal.destroyAll();
    };
  }, [gameover, resetDate]);
  // api error message
  useEffect(() => {
    if (errMsg) {
      message.error(errMsg, () => {
        setErrMsg(null);
      });
    }
  }, [errMsg]);
  useEffect(() => {
    if (finished) {
      notification.success({ message: 'Awesome data ready!' });
    }
  }, [finished]);
  return (
    <Suspense fallback={<Loading />}>
      <Header
        finished={finished}
        url={url}
        total={total}
        loading={loading}
        loadStars={startLoadStars}
        getTotal={getTotalCount}
      />
      <Tabs loading={loading} activeTab={activeTab} data={data} repo={repo} />
      <AvatorWall total={data && data.total} avators={getAvators(data)} />
      <Footer />
    </Suspense>
  );
};
export default App;
