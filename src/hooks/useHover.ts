import { useState } from 'react';

const useHover = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return {
    isHover,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHover;
