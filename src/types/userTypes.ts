import * as types from '../redux/constants/constants';

export type TUser = {
  email: string;
  name: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserRegister = {
  email: string;
  password: string;
  name: string;
};

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUpdateUserInfo = {
  email?: string;
  password?: string;
  name?: string;
};

export type TUserInfoState = {
  isCheckAuth: boolean;
  isAuth: boolean;
  userInfo: TUser;
};

export type TMap = {
  request: string;
  success: string;
  error: string;
};

export type TRequestState = {
  loading: boolean;
  success: boolean;
  error: null | string;
};

// USER_CHECK_AUTH

export type TUserCheckAuthFail = {
  type: typeof types.USER_CHECK_AUTH_FAIL;
};

export type TUserCheckAuthRequest = {
  type: typeof types.USER_CHECK_AUTH_REQUEST;
};

export type TUserCheckAuthSuccess = {
  type: typeof types.USER_CHECK_AUTH_SUCCESS;
  payload: TUser;
};

export type TUserCheckAuthError = {
  type: typeof types.USER_CHECK_AUTH_ERROR;
  error: unknown;
};

// USER_LOGIN

export type TUserLoginRequest = {
  type: typeof types.USER_LOGIN_REQUEST;
};

export type TUserLoginSuccess = {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: TUser;
};

export type TUserLoginError = {
  type: typeof types.USER_LOGIN_ERROR;
  error: unknown;
};

// USER_LOGOUT

export type TUserLogoutRequest = {
  type: typeof types.USER_LOGOUT_REQUEST;
};

export type TUserLogoutSuccess = {
  type: typeof types.USER_LOGOUT_SUCCESS;
};

export type TUserLogoutError = {
  type: typeof types.USER_LOGOUT_ERROR;
  error: unknown;
};

// USER_REGISTER

export type TUserRegisterRequest = {
  type: typeof types.USER_REGISTER_REQUEST;
};

export type TUserRegisterSuccess = {
  type: typeof types.USER_REGISTER_SUCCESS;
  payload: TUser;
};

export type TUserRegisterError = {
  type: typeof types.USER_REGISTER_ERROR;
  error: unknown;
};

// USER_PROFILE

export type TUserProfileRequest = {
  type: typeof types.USER_PROFILE_REQUEST;
};

export type TUserProfileSuccess = {
  type: typeof types.USER_PROFILE_SUCCESS;
  payload: TUser;
};

export type TUserProfileError = {
  type: typeof types.USER_PROFILE_ERROR;
  error: unknown;
};

// USER_UPDATE_PROFILE

export type TUserUpdateProfileRequest = {
  type: typeof types.USER_UPDATE_PROFILE_REQUEST;
};

export type TUserUpdateProfileSuccess = {
  type: typeof types.USER_UPDATE_PROFILE_SUCCESS;
  payload: TUser;
};

export type TUserUpdateProfileError = {
  type: typeof types.USER_UPDATE_PROFILE_ERROR;
  error: unknown;
};

// USER_FORGOT_PASSWORD

export type TUserForgotPasswordRequest = {
  type: typeof types.USER_FORGOT_PASSWORD_REQUEST;
};

export type TUserForgotPasswordSuccess = {
  type: typeof types.USER_FORGOT_PASSWORD_SUCCESS;
};

export type TUserForgotPasswordError = {
  type: typeof types.USER_FORGOT_PASSWORD_ERROR;
  error: unknown;
};

// USER_RESET_PASSWORD

export type TUserResetPasswordRequest = {
  type: typeof types.USER_RESET_PASSWORD_REQUEST;
};

export type TUserResetPasswordSuccess = {
  type: typeof types.USER_RESET_PASSWORD_SUCCESS;
};

export type TUserResetPasswordError = {
  type: typeof types.USER_RESET_PASSWORD_ERROR;
  error: unknown;
};

// UserActions

export type TUserActions =
  | TUserCheckAuthFail
  | TUserCheckAuthRequest
  | TUserCheckAuthSuccess
  | TUserCheckAuthError
  | TUserLoginRequest
  | TUserLoginSuccess
  | TUserLoginError
  | TUserLogoutRequest
  | TUserLogoutSuccess
  | TUserLogoutError
  | TUserRegisterRequest
  | TUserRegisterSuccess
  | TUserRegisterError
  | TUserProfileRequest
  | TUserProfileSuccess
  | TUserProfileError
  | TUserUpdateProfileRequest
  | TUserUpdateProfileSuccess
  | TUserUpdateProfileError
  | TUserForgotPasswordRequest
  | TUserForgotPasswordSuccess
  | TUserForgotPasswordError
  | TUserResetPasswordRequest
  | TUserResetPasswordSuccess
  | TUserResetPasswordError;
