/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';
import { TwitterOutlined, WeiboOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  font-size: 0.8rem;
  color: #ddd;
  .producthunt {
    margin-bottom: 0.5rem;
  }
  .copyright,
  .icp {
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
      <div className="social">
        <a href="//twitter.com/wsygc" target="_blank">
          <TwitterOutlined className="icon" />
          @wsygc
        </a>
        <a href="//weibo.com/yanggc2014" target="_blank">
          <WeiboOutlined className="icon" />
          @Zerosoul_Man
        </a>
      </div>
      <div className="copyright">
        Copyright © 2019 by
        <a href="//yangerxiao.com" target="_blank">
          Tristan
        </a>
      </div>
      <div className="icp">
        <a rel="noopener noreferrer" target="_blank" href="http://www.beian.miit.gov.cn/">
          京ICP备16015459号-1
        </a>
      </div>
    </Wrapper>
  );
}
