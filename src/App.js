import React, { useState, useEffect } from 'react';
import { message, Modal, notification } from 'antd';
import styled from 'styled-components';
import { useStars, useLimit } from './hooks';
import { getAvators, getQueryValue } from './utils';
import Header from './components/Header';
import Tabs from './containers/Tabs';
import AvatorWall from './components/AvatorWall';
import Footer from './components/Footer';
message.config({
  duration: 2,
  maxCount: 1
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
  const { repo, startLoadStars, getTotalCount, data, total, loading, finished, error } = useStars();

  useEffect(() => {
    if (error) {
      let tmpMsg = '';
      const { graphQLErrors, networkError } = error;
      switch ((graphQLErrors.length && graphQLErrors[0].type) || networkError.statusCode) {
        case 401:
          tmpMsg = 'Github API Unauthorized!';
          break;
        case 'NOT_FOUND':
          tmpMsg = 'No result, check inputs please!';
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
    <>
      <Header
        finished={finished}
        url={url}
        total={total}
        loading={loading}
        loadStars={startLoadStars}
        getTotal={getTotalCount}
      />
      <Tabs activeTab={activeTab} data={data} repo={repo} />
      {finished && <AvatorWall total={data.total} avators={getAvators(data)} />}
      <Footer />
    </>
  );
};
export default App;
