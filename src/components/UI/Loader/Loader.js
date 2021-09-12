import React from 'react';

import styles from './Loader.module.css';

function Loader({ height }) {
  return (
    <div style={{ height }} className={styles.container}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
}

export default Loader;
