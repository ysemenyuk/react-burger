import { useEffect, useState, useRef } from 'react';

function useProfileInput(initValue) {
  const [value, setValue] = useState(initValue);
  const [input, setInput] = useState({ disabled: true, icon: 'EditIcon' });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [input.disabled]);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onIconClick = (e) => {
    if (input.disabled) {
      setInput({ disabled: false, icon: 'CloseIcon' });
    } else {
      setInput({ disabled: true, icon: 'EditIcon' });
    }
  };

  return {
    disabled: input.disabled,
    icon: input.icon,
    ref: inputRef,
    onIconClick,
    onChange,
    value,
  };
}

export default useProfileInput;
