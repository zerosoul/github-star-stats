import React, { useState } from 'react';
import Wrapper from './ChartWrapper';
import {
  ComposedChart,
  Brush,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function Bars({ data }) {
  const [totalLine, setTotalLine] = useState(true);
  const handleToggle = checked => {
    console.log('d');
    setTotalLine(checked);
  };
  return (
    <Wrapper handleToggle={handleToggle} total={totalLine}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        {totalLine && <YAxis yAxisId="right" orientation="right" />}
        {totalLine && <Line yAxisId="right" type="monotone" dataKey="currTotal" stroke="#82ca9d" />}
        <Tooltip />
        <Legend />

        <Bar dataKey="star" fill="#413ea0" />
        {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
      </ComposedChart>
    </Wrapper>
  );
}
