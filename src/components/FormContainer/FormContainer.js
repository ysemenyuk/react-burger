import cn from 'classnames';
import styles from './FormContainer.module.css';

import PropTypes from 'prop-types';

function FormContainer({ children, title }) {
  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-medium')}>{title}</h1>
      {children}
    </div>
  );
}

FormContainer.propTypes = {
  title: PropTypes.string,
};

export default FormContainer;
