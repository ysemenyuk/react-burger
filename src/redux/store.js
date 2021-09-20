import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { ingridientsReducer } from './reducers/ingridientsReducer.js';
import { orderItemsReducer } from './reducers/orderItemsReducer.js';
import { orderDetailsReducer } from './reducers/orderDetailsReducer.js';
import {
  userInfoReducer,
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './reducers/userReducer.js';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  orderItems: orderItemsReducer,
  orderDetails: orderDetailsReducer,
  userInfo: userInfoReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
