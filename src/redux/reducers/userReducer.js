import { combineReducers } from 'redux';
import { createRequestReducer } from '../../utils/helpers';
import * as types from '../types/types';

const initState = { isCheckAuth: true, isAuth: false, userInfo: { email: '', name: '' } };

export const userInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case types.USER_CHECK_AUTH_SUCCESS:
      return { isCheckAuth: false, isAuth: true, userInfo: action.payload };
    case types.USER_CHECK_AUTH_FAIL:
      return { ...state, isCheckAuth: false };
    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
      return { ...state, isAuth: true, userInfo: action.payload };
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userInfo: action.payload };
    case types.USER_LOGOUT_SUCCESS:
      return { ...initState, isCheckAuth: false };
    default:
      return state;
  }
};

export const userLoginReducer = createRequestReducer(types.userLogin);
export const userRegisterReducer = createRequestReducer(types.userRegister);
export const userProfileReducer = createRequestReducer(types.userProfile);
export const userUpdateProfileReducer = createRequestReducer(types.userUpdateProfile);
export const userForgotPasswordReducer = createRequestReducer(types.userForgotPassword);
export const userResetPasswordReducer = createRequestReducer(types.userResetPassword);

export const userReducer = combineReducers({
  userInfo: userInfoReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
});
