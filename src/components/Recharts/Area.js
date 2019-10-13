import React from 'react';
import {
  ResponsiveContainer,
  AreaChart as Chart,
  Brush,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 590,
//     pv: 800,
//     amt: 1400
//   },
// ];

export default function AreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <Chart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="step" dataKey="star" stroke="#8884d8" fill="#8884d8" />
        {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
      </Chart>
    </ResponsiveContainer>
  );
}
