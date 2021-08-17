import React from 'react';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props) {
  return (
    <div onClick={props.onClose} className={styles.overlay}>
      {props.children}
    </div>
  );
}

export default ModalOverlay;
