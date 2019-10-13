import React from 'react';
import { Avatar, List, Tooltip, Divider, Badge } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 1rem 1.5rem;
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
  .ant-list-pagination {
    text-align: left;
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
        <span className="txt">Stargazers: </span>
        <Badge
          style={{ backgroundColor: '#52c41a' }}
          overflowCount={Number.POSITIVE_INFINITY}
          count={total}
        />
      </h2>
      <Divider />
      <List
        pagination={
          avators.length > 100
            ? {
                size: 'small',
                onChange: page => {
                  console.log(page);
                },
                pageSize: 96
              }
            : false
        }
        grid={{ column: 24, sm: 12 }}
        dataSource={avators}
        renderItem={({ login, name, url }) => (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a target="_blank" href={`//github.com/${login}`} key={url}>
            <Tooltip placement="topLeft" title={name}>
              <Avatar
                title={`https://github.com/${login}`}
                alt={name}
                onMouseOver={handleEnter}
                onMouseLeave={handleOut}
                src={url}
              ></Avatar>
            </Tooltip>
          </a>
        )}
      />
    </Wrapper>
  );
}
