import { useEffect, useState, useRef, ChangeEvent, SyntheticEvent } from 'react';

const useProfileInput = (initValue: string) => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      setDisabled(true);
    }
  };

  const onClick = (e: MouseEvent) => {
    if (inputRef.current !== e.target) {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (!disabled) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onClick);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [disabled]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onReset = () => {
    setValue(initValue);
  };

  const onIconClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (disabled) {
      setDisabled(false);
      setTimeout(() => {
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    } else {
      setDisabled(true);
    }
  };

  return {
    ref: inputRef,
    disabled,
    onIconClick,
    onChange,
    onReset,
    value,
  };
};

export default useProfileInput;
