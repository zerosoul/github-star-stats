import { useState } from 'react';

const useDailyToggle = (defaultVal = true) => {
  const [val, setVal] = useState(defaultVal);

  const handleDailyToggle = checked => {
    console.log('d');
    setVal(checked);
  };

  return { checked: val, handleDailyToggle };
};

const useTotalToggle = (defaultVal = true) => {
  const [val, setVal] = useState(defaultVal);

  const handleTotalToggle = checked => {
    console.log('d');
    setVal(checked);
  };

  return { checked: val, handleTotalToggle };
};
export default useDailyToggle;

export { useDailyToggle, useTotalToggle };
