import React from 'react';
import { useDailyToggle, useTotalToggle } from './hooks';
import { Bar, Line } from 'recharts';

import Wrapper from './ChartWrapper';

export default function Bars({ data }) {
  const { checked: dailyChecked, handleDailyToggle } = useDailyToggle();
  const { checked: totalChecked, handleTotalToggle } = useTotalToggle();
  return (
    <Wrapper
      data={data}
      handleDailyToggle={handleDailyToggle}
      handleToggle={handleTotalToggle}
      total={totalChecked}
      daily={dailyChecked}
    >
      {totalChecked && (
        <Line yAxisId="right" name="Total" type="monotone" dataKey="currTotal" stroke="#82ca9d" />
      )}

      {dailyChecked && <Bar name="Star" legendType="star" dataKey="star" fill="#413ea0" />}
    </Wrapper>
  );
}
