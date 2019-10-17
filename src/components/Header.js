import React, { useState, useEffect } from 'react';
import { Divider, Affix, Input, Badge, message } from 'antd';
import styled from 'styled-components';
import { getRepo } from '../utils';
const { Search } = Input;
const Wrapper = styled.header`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 34rem;
  margin: 0 auto;

  .ant-badge {
    width: 100%;
    position: sticky;
    top: 20;
  }
`;
export default function Header({ url = '', loading, finished, loadStars, getTotal, total }) {
  const [repo, setRepo] = useState(null);
  const [input, setInput] = useState(url);
  useEffect(() => {
    if (url) {
      let tmpRepo = getRepo(url);
      setRepo(tmpRepo);
      setInput(url);
    }
  }, [url]);
  useEffect(() => {
    let tmpRepo = getRepo(input);
    setRepo(tmpRepo);
    if (tmpRepo) {
      getTotal(tmpRepo);
    }
  }, [getTotal, input]);
  const handleChange = ({ target }) => {
    const { value } = target;

    setInput(value);
  };
  return (
    <Wrapper>
      <Affix offsetTop={20} style={{ width: '100%' }}>
        <Badge
          style={{ backgroundColor: '#87d068' }}
          count={repo ? total : 0}
          overflowCount={Number.POSITIVE_INFINITY}
        >
          <Search
            allowClear
            value={input}
            addonBefore={'URL'}
            placeholder="eg: https://github.com/zerosoul/PIW"
            enterButton="Awesome"
            onChange={handleChange}
            disabled={loading}
            onSearch={val => {
              if (!val && finished) {
                return;
              }
              if (!val) {
                message.warning('Please input a github repo URL');
                return;
              }
              console.log({ repo, val });
              if (!repo) {
                message.warning('URL invalid');
                return;
              }
              loadStars(repo);
            }}
          />
        </Badge>
      </Affix>
      <Divider />
    </Wrapper>
  );
}
