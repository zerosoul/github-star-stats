import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tabs, Icon, message } from 'antd';
import { useStars } from './hooks';
import { getSparklinesData, getAvators, getChartData } from './utils';
import Header from './components/Header';
import AvatorWall from './components/AvatorWall';
import Bars from './components/Sparklines/Bars';
import ChartBars from './components/Recharts/Bars';
import ChartLines from './components/Recharts/Lines';
import Lines from './components/Sparklines/Lines';
const { TabPane } = Tabs;
const ChartWrapper = styled.section`
  width: 20rem;
  margin: 0 auto;
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
      const { graphQLErrors } = error;
      switch (graphQLErrors[0].type) {
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
      <Header loading={loading} loadStars={startLoadStars} />
      <StyledTabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="stock" />
              Sparklines
            </span>
          }
          key="1"
        >
          {finished && (
            <ChartWrapper>
              <Lines data={getSparklinesData(data)} />
              <Bars data={getSparklinesData(data)} />
            </ChartWrapper>
          )}
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="area-chart" />
              Recharts
            </span>
          }
          key="2"
        >
          {finished && (
            <ChartWrapper>
              <ChartBars data={getChartData(data)} />
              <ChartLines data={getChartData(data)} />
            </ChartWrapper>
          )}
        </TabPane>
      </StyledTabs>
      {finished && <AvatorWall total={data.total} avators={getAvators(data)} />}
    </>
  );
};
export default App;
