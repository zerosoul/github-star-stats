import { lazy, Suspense, useState, useEffect } from 'react';
import { message, notification } from 'antd';
import { useStarTotal, useStars, useLimit } from './hooks';
import { getAvators, getQueryValue } from './utils';

import Loading from './components/Loading';
import GameoverModal from './components/GameoverModal';
const Tabs = lazy(() => {
  return import('./containers/Tabs');
});
const LimitTip = lazy(() => {
  return import('./components/LimitTip');
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

const App = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [errMsg, setErrMsg] = useState('');
  const { gameover, remaining, resetDate } = useLimit();

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
    if (tabVal) {
      setActiveTab(tabVal);
    }
  }, []);

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
      <LimitTip resetDate={resetDate} leftCount={remaining} />
      <GameoverModal gameover={gameover} resetDate={resetDate} />
      <Header
        gameover={gameover}
        finished={finished}
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
