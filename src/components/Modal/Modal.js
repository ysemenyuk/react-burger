import styles from './Modal.module.css';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import useHover from '../../hooks/useHover';

const modalRoot = document.getElementById('modals');

function Modal({ children, onClose, title }) {
  const { isHover, onMouseEnter, onMouseLeave } = useHover();

  const handleClickOnOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const onKeyDown = (e) => {
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

  return ReactDOM.createPortal(
    <ModalOverlay handleClickOnOverlay={handleClickOnOverlay}>
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
          <h2 className={cn(styles.title, 'text', 'text_type_main-large')}>{title}</h2>
        ) : (
          <span className={styles.emptyTitle}> </span>
        )}
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
