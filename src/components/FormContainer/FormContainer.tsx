import cn from 'classnames';
import styles from './FormContainer.module.css';

import { FC } from 'react';

interface IProps {
  title: string;
}

const FormContainer: FC<IProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-medium')}>{title}</h1>
      {children}
    </div>
  );
};

export default FormContainer;
