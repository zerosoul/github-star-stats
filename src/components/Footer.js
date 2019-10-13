/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';
import { TwitterFollowButton } from 'react-twitter-embed';
import { Divider } from 'antd';
const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  font-size: 0.8rem;
  color: #ddd;
  .copyright {
    margin-bottom: 1rem;
    a {
      color: #666;
      padding: 0 0.4rem;
    }
  }
`;
export default function Footer() {
  return (
    <Wrapper>
      <Divider />
      <span className="copyright">
        Copyright © 2019 by
        <a href="//yangerxiao.com" target="_blank">
          Tristan
        </a>
      </span>
      <TwitterFollowButton screenName={'wsygc'} />
    </Wrapper>
  );
}
