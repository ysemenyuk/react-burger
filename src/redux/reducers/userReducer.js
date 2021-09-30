// import { createStore, combineReducers, applyMiddleware } from 'redux';

import {
  USER_CHECK_AUTH_SUCCESS,
  USER_CHECK_AUTH_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
} from '../types/types';

const initState = { isCheckAuth: true, isAuth: false, userInfo: { email: '', name: '' } };

export const userInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_CHECK_AUTH_SUCCESS:
      return { isCheckAuth: false, isAuth: true, userInfo: action.payload };
    case USER_CHECK_AUTH_FAIL:
      return { ...state, isCheckAuth: false };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, isAuth: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userInfo: action.payload };
    case USER_LOGOUT_SUCCESS:
      return { ...initState, isCheckAuth: false };
    default:
      return state;
  }
};

export const userLoginReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_REGISTER_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

export const userProfileReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_PROFILE_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_PROFILE_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return { loading: true, success: false, error: null };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.error };
    default:
      return state;
  }
};

// export const userReducer = combineReducers({
//   userInfo: userInfoReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userProfile: userProfileReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   userForgotPassword: userForgotPasswordReducer,
//   userResetPassword: userResetPasswordReducer,
// });
