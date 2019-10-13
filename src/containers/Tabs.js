import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon, Tabs, Progress } from 'antd';
import ChartBars from '../components/Recharts/Bars';
import ChartLines from '../components/Recharts/Lines';
import ChartArea from '../components/Recharts/Area';
import Download from '../components/DownloadSVG';

import { getChartData, getPercent } from '../utils';

const StyledTabs = styled(Tabs)`
  &.ant-tabs {
    margin: 1rem 3rem;
  }
  .tips {
    display: flex;
    margin-top: 0.5rem;
    .divide {
      width: 0.5rem;
    }
  }
`;
const { TabPane } = Tabs;
const ChartWrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  overflow-x: scroll;
`;

export default function TabsContainer({ activeTab = 1, data, repo }) {
  const tabs = useRef(null);
  const [active, setActive] = useState(null);
  const [svgEle, setSvgEle] = useState(null);
  const percent = getPercent(data);
  console.log({ percent });

  useEffect(() => {
    console.log({ active });
    if (data) {
      setTimeout(() => {
        let svgEle = document.querySelector('.ant-tabs .ant-tabs-tabpane-active svg');
        setSvgEle(svgEle);
      }, 10);
    }
  }, [active, data]);
  const DownloadBtn = (
    <div className="tips">
      {!(percent == 0 || percent == 100) ? (
        <Progress
          type="circle"
          status={'active'}
          format={() => null}
          percent={percent}
          width={25}
        />
      ) : null}
      <div className="divide"></div>
      {percent == 100 ? <Download title={`${repo.owner}/${repo.name}`} svg={svgEle} /> : null}
    </div>
  );
  return (
    <StyledTabs
      ref={tabs}
      onChange={tabKey => {
        setActive(tabKey);

        console.log({ tabKey, tabs });
      }}
      activeKey={`${active || activeTab}`}
      tabBarExtraContent={DownloadBtn}
    >
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
  );
}
