/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';
import { Divider, Icon } from 'antd';
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
  .social {
    font-size: 0.6rem;
    display: flex;
    margin-bottom: 0.5rem;
    > a {
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      .icon {
        font-size: 1rem;
        margin-right: 0.2rem;
      }
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
      <div className="social">
        <a href="//twitter.com/wsygc" target="_blank">
          <Icon className="icon" type="twitter" />
          @wsygc
        </a>
        <a href="//weibo.com/yanggc2014" target="_blank">
          <Icon className="icon" type="weibo" />
          @Zerosoul_Man
        </a>
      </div>

      <a
        className="producthunt"
        href="https://www.producthunt.com/posts/github-star-statistics-tool?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-github-star-statistics-tool"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=171040&theme=dark"
          alt="Github Star Statistics Tool - Awesome github daily star statistics tool | Product Hunt Embed"
          style={{ width: '250px', height: '54px' }}
        />
      </a>
    </Wrapper>
  );
}
