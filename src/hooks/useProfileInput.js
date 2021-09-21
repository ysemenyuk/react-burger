import { useEffect, useState, useRef } from 'react';

function useProfileInput(initValue) {
  const [value, setValue] = useState('');
  const [input, setInput] = useState({ disabled: true, icon: 'EditIcon' });

  const inputRef = useRef(null);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const onKeyDown = (e) => {
    if (e.code === 'Escape') {
      setInput({ disabled: true, icon: 'EditIcon' });
    }
  };

  const onClick = (e) => {
    if (inputRef.current !== e.target) {
      setInput({ disabled: true, icon: 'EditIcon' });
    }
  };

  useEffect(() => {
    if (!input.disabled) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClick);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [input.disabled]);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const onReset = (e) => {
    setValue(initValue);
  };

  const onIconClick = (e) => {
    if (input.disabled) {
      setInput({ disabled: false, icon: 'CloseIcon' });
      setTimeout(() => {
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
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
    onReset,
    value,
  };
}

export default useProfileInput;
