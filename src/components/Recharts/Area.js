import React, { useState } from 'react';
import Wrapper from './ChartWrapper';

import { Area, YAxis } from 'recharts';

export default function AreaChart({ data }) {
  const [totalLine, setTotalLine] = useState(true);
  const handleToggle = checked => {
    console.log('d');
    setTotalLine(checked);
  };
  return (
    <Wrapper data={data} handleToggle={handleToggle} total={totalLine}>
      {totalLine && <YAxis yAxisId="right" orientation="right" />}
      {totalLine && (
        <Area
          yAxisId="right"
          stackId="1"
          dataKey="currTotal"
          fill="rgba(2,2,2,.1)"
          stroke="rgba(2,2,2,.4)"
        />
      )}

      <Area type="step" stackId="1" dataKey="star" stroke="#8884d8" fill="#8884d8" />
    </Wrapper>
  );
}
