import styles from './App.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import Ingridient from '../../pages/Ingridient/Ingridient';
import NotFound from '../../pages/404/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Loader from '../UI/Loader/Loader';

import { checkUser } from '../../redux/actions/userActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  if (user.checkAuth) {
    return <Loader height='100vh' />;
  }

  return (
    <div className={styles.wrapper}>
      <Router>
        <AppHeader />
        <div className={styles.main}>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/register' exact>
              <Register />
            </Route>
            <Route path='/forgot-password' exact>
              <ForgotPassword />
            </Route>
            <Route path='/reset-password' exact>
              <ResetPassword />
            </Route>
            <ProtectedRoute path='/profile'>
              <Profile />
            </ProtectedRoute>
            <Route path='/ingredients/:id'>
              <Ingridient />
            </Route>
            <Route path='/not-found'>
              <NotFound />
            </Route>
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
