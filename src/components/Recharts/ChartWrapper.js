import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Switch, Icon } from 'antd';

const StyledOutWrapper = styled.section`
  position: relative;
  .opts {
    position: absolute;
    right: 0;
    z-index: 999;
    padding: 0.4rem 0.6rem;
    background: rgba(0, 0, 0, 0.4);
    &.setting {
      padding: 0;
      background: none;
      font-size: 1.2rem;
    }
    .opt {
      label {
        color: #fff;
        font-size: 0.6rem;
        padding-right: 0.2rem;
        &:after {
          content: ':';
        }
      }
    }
  }
`;
export default function ChartWrapper({ opt = true, total, handleToggle, children }) {
  const [setting, setSetting] = useState(false);
  const handleSetting = () => {
    setSetting(!setting);
  };
  return (
    <StyledOutWrapper>
      {opt && (
        <div
          className={`opts ${setting ? '' : 'setting'}`}
          onMouseLeave={() => {
            setTimeout(() => {
              setSetting(false);
            }, 300);
          }}
        >
          {setting ? (
            <>
              <div className="opt">
                <label>Total Stats</label>
                <Switch size="small" checked={total} onChange={handleToggle} />
              </div>
            </>
          ) : (
            <Icon onClick={handleSetting} type="setting" />
          )}
        </div>
      )}
      <ResponsiveContainer width="100%" height={500} style={{ overflow: 'hidden' }}>
        {children}
      </ResponsiveContainer>
    </StyledOutWrapper>
  );
}
