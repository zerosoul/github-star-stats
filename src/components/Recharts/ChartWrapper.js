import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function ChartWrapper({ children }) {
  return (
    <ResponsiveContainer width="100%" height={500} style={{ overflow: 'hidden' }}>
      {children}
    </ResponsiveContainer>
  );
}
