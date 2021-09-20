// import cn from 'classnames';
import styles from './ProfileSidebar.module.css';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { userLogout } from '../../redux/actions/userActions';

function ProfileSidebar() {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    dispatch(userLogout());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <NavLink
          exact
          to='/profile'
          activeClassName={styles.active}
          className={styles.menuLink}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to={`/profile/orders`}
          activeClassName={styles.active}
          className={styles.menuLink}
        >
          История заказов
        </NavLink>
        <button onClick={logoutHandler} className={styles.menuButton}>
          Выход
        </button>
      </div>
      <span className={styles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </div>
  );
}

export default ProfileSidebar;
