/* eslint-disable react-hooks/exhaustive-deps */
import styles from './App.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegisterPage from '../../pages/Register/Register';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import ProfilePage from '../../pages/Profile/Profile';
import IngridientPage from '../../pages/Ingredient/Ingredient';
import NotFoundPage from '../../pages/404/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Loader from '../UI/Loader/Loader';

import { checkUserAuth } from '../../redux/actions/userActions';

function App() {
  const dispatch = useDispatch();

  const isCheckUserAuth = useSelector((state) => state.userInfo.isCheckUserAuth);
  const isModalOpen = useSelector((state) => state.ingredientDetails.isModalOpen);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  if (isCheckUserAuth) {
    return <Loader height='100vh' />;
  }

  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.main}>
        <Switch>
          <Route exact={!isModalOpen} path='/' children={<HomePage />} />
          <Route exact path='/login' children={<LoginPage />} />
          <Route exact path='/register' children={<RegisterPage />} />
          <Route exact path='/forgot-password' children={<ForgotPasswordPage />} />
          <Route exact path='/reset-password' children={<ResetPasswordPage />} />
          <ProtectedRoute path='/profile' children={<ProfilePage />} />
          <Route path='/ingredients/:id' children={<IngridientPage />} />
          <Route children={<NotFoundPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
