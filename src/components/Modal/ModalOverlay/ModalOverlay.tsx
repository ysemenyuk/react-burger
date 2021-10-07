import { FC, SyntheticEvent } from 'react';

import styles from './ModalOverlay.module.css';

interface IProps {
  onClick: (e: SyntheticEvent) => void;
}

const ModalOverlay: FC<IProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
