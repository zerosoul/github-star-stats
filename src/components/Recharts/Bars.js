import React, { useRef } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Brush,
  Bar,
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

export default function Bars({ data }) {
  const container = useRef(null);
  return (
    <>
      <ResponsiveContainer ref={container} width="90%" height={500}>
        <BarChart data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="star" fill="#413ea0" />
          {data.length > 20 && <Brush dataKey="date" height={30} stroke="#8884d8" />}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
