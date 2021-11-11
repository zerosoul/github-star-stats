import React from 'react';
import { useDailyToggle, useTotalToggle } from './hooks';
import Wrapper from './ChartWrapper';

import { Area } from 'recharts';

export default function AreaChart({ data }) {
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
        <Area
          yAxisId="right"
          stackId="1"
          name="Total"
          dataKey="currTotal"
          fill="rgba(2,2,2,.1)"
          stroke="rgba(2,2,2,.4)"
        />
      )}

      {dailyChecked && (
        <Area name="Star" legendType="star" type="step" stackId="1" dataKey="star" stroke="#8884d8" fill="#8884d8" />
      )}
    </Wrapper>
  );
}
