import React from 'react';
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

import CustomTooltip from './Tooltip';
import Setting from './Setting';

const StyledOutWrapper = styled.section`
  position: relative;
`;

export default function ChartWrapper({
  common = true,
  data = [],
  opt = true,
  total,
  daily,
  handleToggle,
  handleDailyToggle,
  children
}) {
  return (
    <StyledOutWrapper>
      {opt && (
        <Setting
          total={total}
          daily={daily}
          toggleTotal={handleToggle}
          toggleDaily={handleDailyToggle}
        />
      )}
      <ResponsiveContainer width="100%" height={500} style={{ overflow: 'hidden' }}>
        {common ? (
          <ComposedChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,.8)" />
            <XAxis dataKey="date" hide={!(daily || total)} />
            <YAxis hide={!daily} />
            <YAxis hide={!total} yAxisId="right" orientation="right" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
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
