import cn from 'classnames';
import styles from './NotFound.module.css';

import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <div className={cn(styles.main)}>
      <h1>404 - page not found</h1>
      <Link to='/'>Go to the main page</Link>
    </div>
  );
};

export default NotFound;
