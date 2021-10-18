import styles from './Loader.module.css';
import { FC } from 'react';

type TLoaderProps = {
  height?: string;
};

const Loader: FC<TLoaderProps> = ({ height }) => {
  return (
    <div style={{ height }} className={styles.container}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};

export default Loader;
