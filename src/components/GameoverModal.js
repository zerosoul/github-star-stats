import React, { useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
const ModalInfoWrapper = styled.div`
  > p {
    margin-bottom: 1.4rem;
    > span {
      color: red;
      font-weight: 800;
      padding: 0 0.2rem;
    }
  }
`;
export default function GameoverModal({ gameover = false, resetDate }) {
  useEffect(() => {
    if (gameover) {
      Modal.warning({
        title: 'Game Over! ',
        content: (
          <ModalInfoWrapper>
            <p>
              Today API requests remaining is <span>ZERO</span>
            </p>
            <p>
              Renew at <span>{resetDate}</span>!
            </p>
            <a href="https://developer.github.com/v4/guides/resource-limitations/">More Info</a>
          </ModalInfoWrapper>
        ),
        okText: 'Got it'
      });
    }
    return () => {
      Modal.destroyAll();
    };
  }, [gameover, resetDate]);

  return null;
}
