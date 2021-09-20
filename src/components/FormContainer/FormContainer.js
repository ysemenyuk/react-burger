import cn from 'classnames';
import styles from './FormContainer.module.css';

function FormContainer({ children, title }) {
  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-medium', 'mb-6')}>{title}</h1>
      {children}
    </div>
  );
}

export default FormContainer;
