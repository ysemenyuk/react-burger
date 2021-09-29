import styles from './Message.module.css';

function Message({ message, height }) {
  return (
    <div style={{ height }} className={styles.container}>
      <div className={styles.message}>{message}</div>
    </div>
  );
}

export default Message;
