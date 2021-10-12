/* eslint-disable react-hooks/exhaustive-deps */
import styles from './App.module.css';

import { FC, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

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
import ModalWithIngredient from '../ModalWithIngridient/ModalWithIngredient';
import FeedPage from '../../pages/Feed/Feed';
import OrderPage from '../../pages/Order/Order';
import UserOrderPage from '../../pages/UserOrder/UserOrder';
import ModalWithOrder from '../ModalWithOrder/ModalWithOrder';

import { checkUserAuth, userAuthFail } from '../../redux/actions/userActions';
import { userSelectors, ingredientsSelectors, ordersSelectors } from '../../redux/selectors';
import { getRefreshToken } from '../../utils/helpers';
import { TLocation } from '../../types/mainTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation<{ background: TLocation }>();

  const { isCheckAuth } = useAppSelector(userSelectors.userInfo);
  const ingredientDetails = useAppSelector(ingredientsSelectors.ingredientDetails);
  const orderDetails = useAppSelector(ordersSelectors.orderDetails);
  console.log(orderDetails);

  useEffect(() => {
    getRefreshToken() ? dispatch(checkUserAuth()) : dispatch(userAuthFail());
  }, []);

  if (isCheckAuth) {
    return <Loader height='100vh' />;
  }

  const background = history.action === 'PUSH' && location.state && location.state.background;

  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <div className={styles.main}>
        <Switch location={background || location}>
          <Route exact path='/' children={<HomePage />} />
          <Route exact path='/login' children={<LoginPage />} />
          <Route exact path='/register' children={<RegisterPage />} />
          <Route exact path='/forgot-password' children={<ForgotPasswordPage />} />
          <Route exact path='/reset-password' children={<ResetPasswordPage />} />
          <Route exact path='/ingredients/:id' children={<IngridientPage />} />
          <Route exact path='/feed' children={<FeedPage />} />
          <Route exact path='/feed/:id' children={<OrderPage />} />
          <ProtectedRoute path='/profile/orders/:id' children={<UserOrderPage />} />
          <ProtectedRoute path='/profile' children={<ProfilePage />} />
          <Route children={<NotFoundPage />} />
        </Switch>

        {background && ingredientDetails && (
          <Route exact path='/ingredients/:id' children={<ModalWithIngredient />} />
        )}

        {background && orderDetails && (
          <Route exact path={['/feed/:id', '/profile/orders/:id']} children={<ModalWithOrder />} />
        )}
      </div>
    </div>
  );
};

export default App;
