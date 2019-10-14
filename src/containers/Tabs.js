import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon, Tabs, Progress } from 'antd';
import ChartBars from '../components/Recharts/Bars';
import ChartLines from '../components/Recharts/Lines';
import ChartArea from '../components/Recharts/Area';
import Download from '../components/DownloadSVG';
import Logo from '../assets/img/icon.png';
import { getChartData, getPercent } from '../utils';

const StyledTabs = styled(Tabs)`
  &.ant-tabs {
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 44rem;
    min-height: 70vh;
    hgroup {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      img {
        margin-bottom: 1rem;
        width: 10rem;
      }
      .headerTip {
        font-size: 1.2rem;
        font-weight: 800;
        /* text-transform: uppercase; */
        margin-bottom: 0.2rem;
      }
      .subTip {
        font-size: 0.8rem;
        color: #aaa;
      }
    }
  }
  .tips {
    display: flex;
    &.pc {
      justify-content: flex-end;
      padding: 0 1rem;
    }
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

const Header = (
  <hgroup>
    <img src={Logo} alt="star logo" />
    <h1 className="headerTip">⭐️Awesome Star Statistics Tool⭐️</h1>
    <h2 className="subTip">visualize github repo daily stars</h2>
  </hgroup>
);
export default function TabsContainer({ activeTab = 1, data, repo }) {
  const tabs = useRef(null);
  const [active, setActive] = useState(null);
  const [svgEle, setSvgEle] = useState(null);
  const percent = getPercent(data);
  console.log({ percent });
  const isMobile = window.innerWidth < 751 ? true : false;
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
    <div className={`tips ${isMobile ? '' : 'pc'}`}>
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
      tabPosition={isMobile ? 'top' : 'left'}
    >
      <TabPane
        tab={
          <span>
            <Icon type="bar-chart" />
            Bar
          </span>
        }
        key="1"
      >
        {data ? (
          <ChartWrapper>
            <ChartBars data={getChartData(data)} />
          </ChartWrapper>
        ) : (
          Header
        )}
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="line-chart" />
            Line
          </span>
        }
        key="2"
      >
        {data ? (
          <ChartWrapper>
            <ChartLines data={getChartData(data)} />
          </ChartWrapper>
        ) : (
          Header
        )}
      </TabPane>
      <TabPane
        tab={
          <span>
            <Icon type="area-chart" />
            Area
          </span>
        }
        key="3"
      >
        {data ? (
          <ChartWrapper>
            <ChartArea data={getChartData(data)} />
          </ChartWrapper>
        ) : (
          Header
        )}
      </TabPane>
    </StyledTabs>
  );
}
