import React, { useState } from 'react';

import Wrapper from './ChartWrapper';
import Tip from './Tooltip';
import { LineChart, Brush, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log({ label, payload });
    const [star = {}, total = {}] = payload;
    return <Tip label={label} total={total.value} star={star.value} />;
  }

  return null;
};

export default function Lines({ data }) {
  const [totalLine, setTotalLine] = useState(true);

  const handleToggle = checked => {
    console.log('d');
    setTotalLine(checked);
  };

  return (
    <Wrapper handleToggle={handleToggle} total={totalLine}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.8)" />
        <XAxis dataKey="date" />
        <YAxis />
        <Line dataKey="star" fill="#413ea0" />

        {totalLine && <YAxis yAxisId="right" orientation="right" />}
        {totalLine && <Line yAxisId="right" type="monotone" dataKey="currTotal" stroke="#82ca9d" />}
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
      </LineChart>
    </Wrapper>
  );
}
