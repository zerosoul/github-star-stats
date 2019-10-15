import React from 'react';
import styled from 'styled-components';
import { Statistic, Icon } from 'antd';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
  padding: 0.2rem 0.4rem;
`;

export default function Tooltip({ label = 'label', star = null, total = null }) {
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
