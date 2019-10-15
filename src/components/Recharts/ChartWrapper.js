import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import styled from 'styled-components';
import { Switch, Icon } from 'antd';

import Tip from './Tooltip';

const StyledOutWrapper = styled.section`
  position: relative;
  .opts {
    position: absolute;
    right: 0;
    z-index: 999;
    padding: 0.4rem 0.6rem;
    background: rgba(0, 0, 0, 0.4);
    &.setting {
      padding: 0;
      background: none;
      font-size: 1.2rem;
    }
    .opt {
      label {
        color: #fff;
        font-size: 0.6rem;
        padding-right: 0.2rem;
        &:after {
          content: ':';
        }
      }
    }
  }
`;

const CustomTooltip = ({ active, payload = [], label }) => {
  if (active) {
    console.log({ label, payload });
    const [star = {}, total = {}] = payload;
    return <Tip label={label} total={total.value} star={star.value} />;
  }

  return null;
};
export default function ChartWrapper({
  common = true,
  data = [],
  opt = true,
  total,
  handleToggle,
  children
}) {
  const [setting, setSetting] = useState(false);
  const handleSetting = () => {
    setSetting(!setting);
  };
  return (
    <StyledOutWrapper>
      {opt && (
        <div
          className={`opts ${setting ? '' : 'setting'}`}
          onMouseLeave={() => {
            setTimeout(() => {
              setSetting(false);
            }, 300);
          }}
        >
          {setting ? (
            <>
              <div className="opt">
                <label>Total Stats</label>
                <Switch size="small" checked={total} onChange={handleToggle} />
              </div>
            </>
          ) : (
            <Icon onClick={handleSetting} type="setting" />
          )}
        </div>
      )}
      <ResponsiveContainer width="100%" height={500} style={{ overflow: 'hidden' }}>
        {common ? (
          <ComposedChart data={data}>
            <CartesianGrid key="c" stroke="rgba(255,255,255,.8)" />
            <XAxis key="cd" dataKey="date" />
            <YAxis key="cdd" />
            <Legend key="csss" />
            <Tooltip key="csssf" content={<CustomTooltip />} />
            {children}
            {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
          </ComposedChart>
        ) : (
          children
        )}
      </ResponsiveContainer>
    </StyledOutWrapper>
  );
}
