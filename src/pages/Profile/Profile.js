// import cn from 'classnames';
import styles from './Profile.module.css';

import { useDispatch } from 'react-redux';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';

import Profile from '../../components/Profile/Profile';
import { userLogout } from '../../redux/actions/userActions';

function ProfilePage() {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const logoutHandler = (e) => {
    dispatch(userLogout());
  };

  return (
    <div className={styles.container}>
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
            to={`${url}/orders`}
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

      <Switch>
        <Route exact path={path}>
          <Profile />
        </Route>
        <Route path={`${path}/orders`}>
          <h3>orders</h3>
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
