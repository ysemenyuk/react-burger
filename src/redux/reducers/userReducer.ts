import { combineReducers } from 'redux';
import { TMap, TRequestState, TUserActions, TUserInfoState } from '../../types/userTypes';
import * as types from '../constants/constants';

const initState: TUserInfoState = {
  isCheckAuth: true,
  isAuth: false,
  userInfo: { email: '', name: '' },
};

export const userInfoReducer = (state = initState, action: TUserActions) => {
  switch (action.type) {
    case types.USER_CHECK_AUTH_SUCCESS:
      return { isCheckAuth: false, isAuth: true, userInfo: action.payload };
    case types.USER_CHECK_AUTH_FAIL:
    case types.USER_LOGOUT_SUCCESS:
      return { ...initState, isCheckAuth: false, userInfo: null };
    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
      return { ...state, isAuth: true, userInfo: action.payload };
    case types.USER_PROFILE_SUCCESS:
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const createRequestReducer = (map: TMap) => {
  const initState: TRequestState = { loading: false, success: false, error: null };
  return (state = initState, action: TUserActions) => {
    switch (action.type) {
      case map.request:
        return { loading: true, success: false, error: null };
      case map.success:
        return { loading: false, success: true, error: null };
      case map.error:
        return { loading: false, success: false, error: 'Network error' };
      default:
        return state;
    }
  };
};

export const userLoginReducer = createRequestReducer(types.userLoginMap);
export const userRegisterReducer = createRequestReducer(types.userRegisterMap);
export const userProfileReducer = createRequestReducer(types.userProfileMap);
export const userUpdateProfileReducer = createRequestReducer(types.userUpdateProfileMap);
export const userForgotPasswordReducer = createRequestReducer(types.userForgotPasswordMap);
export const userResetPasswordReducer = createRequestReducer(types.userResetPasswordMap);

export const userReducer = combineReducers({
  info: userInfoReducer,
  login: userLoginReducer,
  register: userRegisterReducer,
  profile: userProfileReducer,
  updateProfile: userUpdateProfileReducer,
  forgotPassword: userForgotPasswordReducer,
  resetPassword: userResetPasswordReducer,
});
