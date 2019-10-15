import React, { useState } from 'react';
import Wrapper from './ChartWrapper';
import Tip from './Tooltip';

import {
  AreaChart as Chart,
  Brush,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log({ label, payload });
    const [star = {}, total = {}] = payload;
    return <Tip label={label} total={total.value} star={star.value} />;
  }

  return null;
};
export default function AreaChart({ data }) {
  const [totalLine, setTotalLine] = useState(true);
  const handleToggle = checked => {
    console.log('d');
    setTotalLine(checked);
  };
  return (
    <Wrapper handleToggle={handleToggle} total={totalLine}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
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
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area type="step" stackId="1" dataKey="star" stroke="#8884d8" fill="#8884d8" />
        {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
      </Chart>
    </Wrapper>
  );
}
