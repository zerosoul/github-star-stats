import React from 'react';
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots
  // SparklinesReferenceLine
} from 'react-sparklines';

export default function Lines({ data }) {
  return (
    <Sparklines data={data} limit={20}>
      <SparklinesLine color="#253e56" />
      <SparklinesSpots />
      {/* <SparklinesReferenceLine type="mean" /> */}
    </Sparklines>
  );
}
