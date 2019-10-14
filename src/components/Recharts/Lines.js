import React from 'react';
import Wrapper from './ChartWrapper';
import { LineChart, Brush, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 590,
//     pv: 800,
//     amt: 1400
//   },

// ];

export default function Lines({ data }) {
  return (
    <Wrapper>
      <LineChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="star" fill="#413ea0" />
        {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
      </LineChart>
    </Wrapper>
  );
}
