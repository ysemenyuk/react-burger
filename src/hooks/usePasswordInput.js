import { useState, useRef } from 'react';

function usePasswordInput(initValue) {
  const [input, setInput] = useState({ type: 'password', icon: 'ShowIcon' });
  const [value, setValue] = useState(initValue);

  const ref = useRef(null);

  const onIconClick = (e) => {
    input.type === 'password'
      ? setInput({ type: 'text', icon: 'HideIcon' })
      : setInput({ type: 'password', icon: 'ShowIcon' });
  };

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return {
    type: input.type,
    icon: input.icon,
    onIconClick,
    onChange,
    ref,
    value,
  };
}

export default usePasswordInput;
