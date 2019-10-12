import React from 'react';
import { Avatar, Tooltip, Divider, Badge } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 1rem 3rem;
  h2 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .txt {
      margin-right: 0.6rem;
    }
  }
  .ant-avatar {
    margin: 0.2rem;
    transition: all 1s;
    &.hover {
      transform: scale(1.5);
    }
  }
`;
export default function AvatorWall({ total, avators }) {
  const handleEnter = ({ target }) => {
    console.log({ target });
    setTimeout(() => {
      target.parentElement.classList.add('hover');
    }, 100);
  };
  const handleOut = ({ target }) => {
    console.log({ target });
    setTimeout(() => {
      target.parentElement.classList.remove('hover');
    }, 100);
  };
  return (
    <Wrapper>
      <h2>
        <span className="txt">Total: </span>
        <Badge style={{ backgroundColor: '#52c41a' }} overflowCount={2000} count={total} />
      </h2>
      <Divider />
      <div className="avatars">
        {avators.map(({ login, name, url }) => {
          return (
            // eslint-disable-next-line react/jsx-no-target-blank
            <a target="_blank" href={`//github.com/${login}`} key={url}>
              <Tooltip placement="topLeft" title={name}>
                <Avatar
                  title={`//github.com/${login}`}
                  alt={name}
                  onMouseOver={handleEnter}
                  onMouseLeave={handleOut}
                  src={url}
                ></Avatar>
              </Tooltip>
            </a>
          );
        })}
      </div>
    </Wrapper>
  );
}
