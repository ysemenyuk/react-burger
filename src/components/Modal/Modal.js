import React from 'react';
import ReactDOM from 'react-dom';
import cs from 'classnames';

import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay';

const modalRoot = document.getElementById('modals');

function Modal(props) {
  const { visible, children, header, onClose } = props;

  function cancelClose(e) {
    e.stopPropagation();
  }

  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'Escape') onClose();
    }

    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '8px';
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={cs(styles.modal, 'p-10')} onClick={cancelClose}>
          <h2 className={cs('pt-3', 'pt-3', 'text text_type_main-large')}>{header}</h2>
          <span onClick={onClose} className={styles.close}></span>
          <div>{children}</div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
}

export default Modal;
