import { useState, useRef, ChangeEvent } from 'react';

const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);

  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return {
    ref,
    value,
    onChange,
  };
};

export default useInput;
