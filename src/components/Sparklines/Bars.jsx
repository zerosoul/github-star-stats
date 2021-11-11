import React from 'react';
import { Sparklines, SparklinesBars } from 'react-sparklines';

export default function Bars({ data }) {
  return (
    <Sparklines data={data} limit={500}>
      <SparklinesBars style={{ stroke: 'white', strokeWidth: '1', fill: '#40c0f5' }} />
    </Sparklines>
  );
}
