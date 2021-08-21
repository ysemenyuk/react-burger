import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modals');

function Modal({ children, title, onClose }) {
  function handleClickOnOverlay(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  }

  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'Escape') onClose();
    }
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '8px';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay handleClickOnOverlay={handleClickOnOverlay}>
      <div className={cn(styles.modal, 'p-10')}>
        {title && <h2 className={cn('pt-3', 'pb-3', 'text text_type_main-large')}>{title}</h2>}
        <span onClick={onClose} className={styles.close}></span>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
