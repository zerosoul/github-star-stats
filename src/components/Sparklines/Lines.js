import React from 'react';
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesReferenceLine
} from 'react-sparklines';

export default function Lines({ data }) {
  return (
    <Sparklines data={data}>
      <SparklinesLine color="#253e56" />
      <SparklinesSpots style={{ fill: '#56b45d' }} />
      <SparklinesReferenceLine type="mean" />
    </Sparklines>
  );
}
