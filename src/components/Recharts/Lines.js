import React from 'react';
import { useDailyToggle, useTotalToggle } from './hooks';

import Wrapper from './ChartWrapper';
import { Line } from 'recharts';

export default function Lines({ data }) {
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
      {dailyChecked && <Line name="Star" dataKey="star" fill="#413ea0" />}

      {totalChecked && (
        <Line name="Total" legendType="star" yAxisId="right" type="monotone" dataKey="currTotal" stroke="#82ca9d" />
      )}
    </Wrapper>
  );
}
