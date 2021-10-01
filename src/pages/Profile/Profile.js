// import cn from 'classnames';
import styles from './Profile.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import UserOrdersList from '../../components/UserOrdersList/UserOrdersList';

import userOrdersSelectors from '../../redux/selectors/userOrdersSelectors';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import { wsUserOrdersConnectionStart } from '../../redux/actions/wsUserOrdersActions';

function ProfilePage() {
  const { path } = useRouteMatch();
  // const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <Switch>
        <Route exact path={path}>
          <ProfileForm />
        </Route>
        <Route path={`${path}/orders`}>
          <UserOrdersList />
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
