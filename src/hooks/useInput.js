import { useState, useRef } from 'react';

function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  const ref = useRef(null);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return {
    ref,
    onChange,
    value,
  };
}

export default useInput;
