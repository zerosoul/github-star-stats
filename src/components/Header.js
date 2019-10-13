import React, { useState, useEffect } from 'react';
import { Divider, Input, Badge, message } from 'antd';
import styled from 'styled-components';
import { getRepo } from '../utils';
const { Search } = Input;
const Wrapper = styled.header`
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 34rem;
  margin: 0 auto;
  > h1 {
    font-size: 1.2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .ant-badge {
    width: 100%;
    position: sticky;
    top: 20;
  }
`;
export default function Header({ url = '', loading, loadStars, getTotal, total }) {
  const [repo, setRepo] = useState(null);
  const [input, setInput] = useState(url);
  useEffect(() => {
    if (url) {
      let tmpRepo = getRepo(url);
      setRepo(tmpRepo);
      setInput(url);
    }
  }, [url]);
  const handleChange = ({ target }) => {
    const { value } = target;
    let tmpRepo = getRepo(value);
    setRepo(tmpRepo);
    if (tmpRepo) {
      getTotal(tmpRepo);
    }
    console.log({ tmpRepo });
    setInput(value);
  };
  return (
    <Wrapper>
      <h1>⭐️ Awesome Star Statistics Tool ️️⭐️</h1>
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
            if (!val) return;
            console.log({ repo, val });
            if (!repo) {
              message.warning('URL invalid');
              return;
            }
            loadStars(repo);
          }}
        />
      </Badge>

      <Divider />
    </Wrapper>
  );
}
