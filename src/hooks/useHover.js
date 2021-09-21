import { useState } from 'react';

function useHover() {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return {
    isHover,
    onMouseEnter,
    onMouseLeave,
  };
}

export default useHover;
