import cn from 'classnames';
import styles from './Profile.module.css';

import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import UserOrdersList from '../../components/UserOrdersList/UserOrdersList';

const ProfilePage: FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className={cn(styles.container)}>
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
};

export default ProfilePage;
