import { useState, useRef, ChangeEvent, MouseEvent } from 'react';

const usePasswordInput = (initValue: string) => {
  const [showText, setShowText] = useState(false);
  const [value, setValue] = useState(initValue);

  const ref = useRef<HTMLInputElement>(null);

  const onIconClick = (e: MouseEvent) => {
    setShowText(!showText);

    setTimeout(() => {
      if (ref && ref.current) {
        ref.current.focus();
      }
    }, 0);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return {
    showText,
    onIconClick,
    onChange,
    ref,
    value,
  };
};

export default usePasswordInput;
