import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Tip from './Tooltip';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    console.log({ label, payload });
    const [star = {}, total = {}] = payload;
    return <Tip label={label} total={total.value} star={star.value} />;
  }

  return null;
};
export default function CommonOpt() {
  return (
    <CartesianGrid key="c" stroke="rgba(255,255,255,.8)" />,
    <XAxis key="cd" dataKey="date" />,
    <YAxis key="cdd" />,
    <Legend key="csss" />,
    <Tooltip key="csssf" content={<CustomTooltip />} />
  );
}
