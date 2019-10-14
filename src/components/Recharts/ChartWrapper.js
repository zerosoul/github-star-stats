import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function ChartWrapper({ children }) {
  return (
    <ResponsiveContainer style={{ overflow: 'hidden' }} width="100%" height={500}>
      {children}
    </ResponsiveContainer>
  );
}
