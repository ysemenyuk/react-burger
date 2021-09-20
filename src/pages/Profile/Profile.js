// import cn from 'classnames';
import styles from './Profile.module.css';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';

function ProfilePage() {
  const { path } = useRouteMatch();

  return (
    <div className={styles.container}>
      <ProfileSidebar />
      <Switch>
        <Route exact path={path}>
          <ProfileForm />
        </Route>
        <Route path={`${path}/orders`}>
          <h3>orders</h3>
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
