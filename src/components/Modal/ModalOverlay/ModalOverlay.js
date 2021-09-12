import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

function ModalOverlay({ children, handleClickOnOverlay }) {
  return (
    <div onClick={handleClickOnOverlay} className={styles.overlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element,
  handleClickOnOverlay: PropTypes.func,
};

export default ModalOverlay;
