import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

function Modal({ children, title, onClose }) {
  const [hover, setHover] = React.useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleClickOnOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    // document.body.style.paddingRight = '8px';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      // document.body.style.paddingRight = '0px';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay handleClickOnOverlay={handleClickOnOverlay}>
      <div className={cn(styles.modal, 'p-10')}>
        <span
          onClick={onClose}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={styles.closeIcon}
        >
          <CloseIcon type={hover ? 'primary' : 'secondary'} />
        </span>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
