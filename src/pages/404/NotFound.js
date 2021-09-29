import cn from 'classnames';
import styles from './NotFound.module.css';

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className={cn(styles.main)}>
      <h1>404 - page not found</h1>
      <Link to='/'>Go to the main page</Link>
    </div>
  );
}

export default NotFound;
