import { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.aside`
  position: absolute;
  right: 0;
  z-index: 999;
  padding: 0.4rem 0.6rem;
  background: rgba(0, 0, 0, 0.6);
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
`;
export default function Setting({ daily, total, toggleTotal, toggleDaily }) {
  const [setting, setSetting] = useState(false);
  const handleSetting = () => {
    setSetting(!setting);
  };
  return (
    <StyledWrapper
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
            <Switch size="small" checked={total} onChange={toggleTotal} />
          </div>
          <div className="opt">
            <label>Daily Stats</label>
            <Switch size="small" checked={daily} onChange={toggleDaily} />
          </div>
        </>
      ) : (
        <SettingOutlined onClick={handleSetting} />
      )}
    </StyledWrapper>
  );
}
