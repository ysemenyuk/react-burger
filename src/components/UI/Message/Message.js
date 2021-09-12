import styles from './Message.module.css';

function Message({ message, height }) {
  return (
    <div style={{ height }} className={styles.container}>
      {message}
    </div>
  );
}

export default Message;
