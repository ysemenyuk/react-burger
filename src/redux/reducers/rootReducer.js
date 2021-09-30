import { combineReducers } from 'redux';

import { wsAllOrdersReducer } from './wsAllOrdersReducer';
import { wsUserOrdersReducer } from './wsUserOrdersReducer';
import { orderItemsReducer, orderDetailsReducer } from './constructorReducer.js';
import { ingredientDetailsReducer, ingredientsReducer } from './ingredientsReducer.js';
import {
  userInfoReducer,
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './userReducer.js';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderItems: orderItemsReducer,
  orderDetails: orderDetailsReducer,
  userInfo: userInfoReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUserOrders: wsUserOrdersReducer,
});
