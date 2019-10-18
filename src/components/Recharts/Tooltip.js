import React from 'react';
import styled from 'styled-components';
import { Statistic, Icon } from 'antd';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
  padding: 0.2rem 0.4rem;
  border: 1px solid rgba(2, 2, 2, 0.3);
`;

function Tooltip({ label = 'label', star = null, total = null }) {
  return (
    <Wrapper>
      <Statistic
        value={label}
        valueStyle={{ fontSize: '.8rem', color: '#2f54eb' }}
        prefix={<Icon type="calendar" />}
      />
      {star !== null && (
        <Statistic
          value={star}
          valueStyle={{ fontSize: '.8rem', color: '#fadb14' }}
          prefix={<Icon type="star" />}
        />
      )}
      {total !== null && (
        <Statistic
          value={total}
          valueStyle={{ fontSize: '.8rem', color: '#faad14' }}
          prefix={<Icon type="usergroup-add" />}
        />
      )}
    </Wrapper>
  );
}

const CustomTooltip = ({ active, payload = [], label }) => {
  if (active && payload) {
    const [star = {}, total = {}] = payload;
    return <Tooltip label={label} total={total.value} star={star.value} />;
  }

  return null;
};

export default CustomTooltip;
