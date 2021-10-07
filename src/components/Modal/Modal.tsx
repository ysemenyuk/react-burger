import styles from './Modal.module.css';
import cn from 'classnames';

import { FC, SyntheticEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import useHover from '../../hooks/useHover';

interface IModalProps {
  children: React.ReactNode;
  title?: string;
  largeTitle?: boolean;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose, title, largeTitle }) => {
  const modalRoot = document.getElementById('modals') as HTMLElement;

  const { isHover, onMouseEnter, onMouseLeave } = useHover();

  const handleClickOnOverlay = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    // document.body.style.paddingRight = '8px';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      // document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const titleStyle = largeTitle
    ? cn(styles.largeTitle, 'text', 'text_type_main-large')
    : cn(styles.title, 'text', 'text_type_digits-default');

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleClickOnOverlay}>
      <div className={cn(styles.modal)}>
        <span
          onClick={onClose}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={styles.closeIcon}
        >
          <CloseIcon type={isHover ? 'primary' : 'secondary'} />
        </span>
        {title ? (
          <span className={titleStyle}>{title}</span>
        ) : (
          <span className={styles.emptyTitle}> </span>
        )}
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
