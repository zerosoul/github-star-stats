import React, { useState } from 'react';
import { Button, Divider, Input } from 'antd';
import styled from 'styled-components';
const Wrapper = styled.header`
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 1.2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .opts {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
`;
export default function Header({ loading, loadStars }) {
  const [repo, setRepo] = useState(null);

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value) {
      try {
        let url = new URL(value);
        if (url.protocol.indexOf('http') > -1) {
          // eslint-disable-next-line no-unused-vars
          let [unused, owner, name] = url.pathname.split('/');
          setRepo({ owner, name });
          console.log({ url });
        }
      } catch (error) {
        console.log(error);
        setRepo(null);
      }
    } else {
      setRepo(null);
    }
  };
  return (
    <Wrapper>
      <h1>⭐️ Awesome Star Statistics Tool ️️⭐️</h1>
      <div className="opts">
        <Input
          placeholder="eg: https://github.com/zerosoul/tech-logo-memo-game"
          required
          onChange={handleChange}
          style={{ width: '80%' }}
        />
        <Button
          type="primary"
          loading={loading}
          disabled={!repo}
          onClick={() => {
            console.log({ repo });

            loadStars(repo);
          }}
        >
          Awesome!
        </Button>
      </div>
      <Divider />
    </Wrapper>
  );
}
