import React, { useState } from 'react';
import Wrapper from './ChartWrapper';
import { Bar, Line, YAxis } from 'recharts';

export default function Bars({ data }) {
  const [totalLine, setTotalLine] = useState(true);
  const handleToggle = checked => {
    console.log('d');
    setTotalLine(checked);
  };
  return (
    <Wrapper data={data} handleToggle={handleToggle} total={totalLine}>
      {totalLine && <YAxis yAxisId="right" orientation="right" />}
      {totalLine && <Line yAxisId="right" type="monotone" dataKey="currTotal" stroke="#82ca9d" />}

      <Bar dataKey="star" fill="#413ea0" />
    </Wrapper>
  );
}
