import React, { useState } from 'react';
import { Button, Divider, Input } from 'antd';
import styled from 'styled-components';
const InputGroup = Input.Group;
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
export default function Header({
  name = 'yangerxiao.com',
  owner = 'zerosoul',
  loading,
  loadStars
}) {
  const [user, setUser] = useState(owner);
  const [repo, setRepo] = useState(name);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    console.log({ value, name });
    if (name == 'owner') {
      setUser(value);
    } else {
      setRepo(value);
    }
  };
  return (
    <Wrapper>
      <h1>⭐️ Github Repo Star Statistics Tool ️️⭐️</h1>
      <div className="opts">
        <InputGroup style={{ width: '70%' }}>
          <Input
            placeholder="Github用户名"
            required
            onChange={handleChange}
            style={{ width: '40%' }}
            name={'owner'}
            value={user}
            defaultValue={'zerosoul'}
          />
          <Input
            onChange={handleChange}
            placeholder="仓库名"
            required
            value={repo}
            style={{ width: '60%' }}
            name="name"
            defaultValue={'yangerxiao.com'}
          />
        </InputGroup>
        <Button
          type="primary"
          loading={loading}
          disabled={!(user && repo)}
          onClick={() => {
            loadStars({ owner: user, name: repo });
          }}
        >
          Awesome!
        </Button>
      </div>
      <Divider />
    </Wrapper>
  );
}
