import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tabs, Icon, message } from 'antd';
import { useStars } from './hooks';
import { getAvators, getChartData } from './utils';
import Header from './components/Header';
import AvatorWall from './components/AvatorWall';
import ChartBars from './components/Recharts/Bars';
import ChartLines from './components/Recharts/Lines';
import ChartArea from './components/Recharts/Area';
const { TabPane } = Tabs;
const ChartWrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
`;
const StyledTabs = styled(Tabs)`
  margin: 1rem 3rem;
`;

const App = () => {
  const [errMsg, setErrMsg] = useState('');
  const { startLoadStars, data, loading, finished, error } = useStars();
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

  return (
    <>
      {errMsg && message.error(errMsg)}
      {finished && message.success('Awesome data ready!')}
      <Header loading={loading} loadStars={startLoadStars} />
      <StyledTabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="bar-chart" />
              Bar Chart
            </span>
          }
          key="1"
        >
          {data && (
            <ChartWrapper>
              <ChartBars data={getChartData(data)} />
            </ChartWrapper>
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="line-chart" />
              Line Chart
            </span>
          }
          key="2"
        >
          {data && (
            <ChartWrapper>
              <ChartLines data={getChartData(data)} />
            </ChartWrapper>
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="area-chart" />
              Area Chart
            </span>
          }
          key="3"
        >
          {data && (
            <ChartWrapper>
              <ChartArea data={getChartData(data)} />
            </ChartWrapper>
          )}
        </TabPane>
      </StyledTabs>
      {finished && <AvatorWall total={data.total} avators={getAvators(data)} />}
    </>
  );
};
export default App;
