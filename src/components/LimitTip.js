import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.aside`
  position: fixed;
  left: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.8rem;
  background-color: rgba(2, 2, 2, 0.7);
  transition: all 0.5s;
  font-size: 1rem;
  color: #fff;
  z-index: 999;
  &.hide {
    transform: translate3d(-90%, -50%, 0);
  }
  &:hover {
    transform: translate3d(0, -50%, 0);
  }
  .tip {
    font-size: 0.8rem;
    max-width: 5.4rem;
    &:not(:last-child) {
      margin-bottom: 0.8rem;
    }
    .title {
      color: #ccc;
      font-size: 0.4rem;
      margin-bottom: 0.4rem;
    }
    .value {
      line-height: 1.2;
    }
  }
`;
export default function LimitTip({ leftCount = 0, resetDate }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tmp = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => {
      clearTimeout(tmp);
    };
  }, [visible]);
  return leftCount ? (
    <StyledWrapper className={visible ? '' : 'hide'}>
      <div className="tip">
        <p className="title">API Remaining</p>
        <p className="value">{leftCount}</p>
      </div>
      <div className="tip">
        <p className="title">Reset Date Time</p>
        <p className="value">{resetDate}</p>
      </div>
    </StyledWrapper>
  ) : null;
}
