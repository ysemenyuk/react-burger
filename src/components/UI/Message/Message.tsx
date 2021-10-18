import styles from './Message.module.css';
import { FC } from 'react';

type TMessageProps = {
  message: string;
  height?: string;
};

const Message: FC<TMessageProps> = ({ message, height }) => {
  return (
    <div style={{ height }} className={styles.container}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default Message;
