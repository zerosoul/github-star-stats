import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useStars } from './hooks';
import { getAvators, getQueryValue } from './utils';
import Header from './components/Header';
import Tabs from './containers/Tabs';
import AvatorWall from './components/AvatorWall';
import Footer from './components/Footer';
message.config({
  duration: 2,
  maxCount: 1
});
const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [url, setUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { repo, startLoadStars, getTotalCount, data, total, loading, finished, error } = useStars();
  console.log({ data });
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

  return (
    <>
      {errMsg &&
        message.error(errMsg, () => {
          setErrMsg(null);
        })}
      {finished && message.success('Awesome data ready!')}
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
