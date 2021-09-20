import { useState, useRef } from 'react';

function usePasswordInput(initValue) {
  const [input, setInput] = useState({ type: 'password', icon: 'ShowIcon' });
  const [value, setValue] = useState(initValue);

  const ref = useRef(null);

  const onIconClick = (e) => {
    if (input.type === 'password') {
      setInput({ type: 'text', icon: 'HideIcon' });
    } else {
      setInput({ type: 'password', icon: 'ShowIcon' });
    }

    setTimeout(() => {
      if (ref && ref.current) {
        ref.current.focus();
      }
    }, 0);
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
