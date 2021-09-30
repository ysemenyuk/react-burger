import normaService from '../../services/normaService';

import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/helpers';

import {
  USER_CHECK_AUTH_SUCCESS,
  USER_CHECK_AUTH_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
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

// actionCreators

const checkUserAuthSuccess = (user) => ({
  type: USER_CHECK_AUTH_SUCCESS,
  payload: user,
});

const checkUserAuthFail = (error) => ({
  type: USER_CHECK_AUTH_FAIL,
  error: error,
});

const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

const userLoginError = (error) => ({
  type: USER_LOGIN_FAIL,
  error: error,
});

const userLogoutRequest = () => ({
  type: USER_LOGOUT_REQUEST,
});

const userLogoutSuccess = (user) => ({
  type: USER_LOGOUT_SUCCESS,
  payload: user,
});

const userLogoutError = (error) => ({
  type: USER_LOGOUT_FAIL,
  error: error,
});

const userRegisterRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

const userRegisterSucces = (data) => ({
  type: USER_REGISTER_SUCCESS,
  payload: data,
});

const userRegisterError = (error) => ({
  type: USER_REGISTER_FAIL,
  error: error,
});

const userProfileRequest = () => ({
  type: USER_PROFILE_REQUEST,
});

const userProfileSuccess = (user) => ({
  type: USER_PROFILE_SUCCESS,
  payload: user,
});

const userProfileError = (error) => ({
  type: USER_PROFILE_FAIL,
  error: error,
});

const updateUserProfileRequest = () => ({
  type: USER_UPDATE_PROFILE_REQUEST,
});

const updateUserProfileSuccess = (user) => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
  payload: user,
});

const updateUserProfileError = (error) => ({
  type: USER_UPDATE_PROFILE_FAIL,
  error: error,
});

const forgotUserPasswordRequest = () => ({
  type: USER_FORGOT_PASSWORD_REQUEST,
});

const forgotUserPasswordSuccess = (user) => ({
  type: USER_FORGOT_PASSWORD_SUCCESS,
  payload: user,
});

const forgotUserPasswordError = (error) => ({
  type: USER_FORGOT_PASSWORD_FAIL,
  error: error,
});

const resetUserPasswordRequest = () => ({
  type: USER_RESET_PASSWORD_REQUEST,
});

const resetUserPasswordSuccess = (user) => ({
  type: USER_RESET_PASSWORD_SUCCESS,
  payload: user,
});

const resetUserPasswordError = (error) => ({
  type: USER_RESET_PASSWORD_FAIL,
  error: error,
});

// thunks

export const checkUserAuth = () => async (dispatch) => {
  if (!getRefreshToken()) {
    dispatch(checkUserAuthFail());
    return;
  }

  try {
    const { user } = await normaService.fetchUserInfo();
    dispatch(checkUserAuthSuccess(user));
  } catch (error) {
    removeRefreshToken();
    removeAccessToken();

    dispatch(checkUserAuthFail());
  }
};

export const userLogin = (form) => async (dispatch) => {
  dispatch(userLoginRequest());

  try {
    const response = await normaService.userLogin(form);

    setRefreshToken(response);
    setAccessToken(response);

    dispatch(userLoginSuccess(response.user));
  } catch (error) {
    // console.log('userLogin error', error);
    dispatch(userLoginError(error));
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(userLogoutRequest());

  try {
    const response = await normaService.userLogout();
    // console.log('userLogin response', response);
    removeRefreshToken(response);
    removeAccessToken(response);

    dispatch(userLogoutSuccess());
  } catch (error) {
    // console.log('userLogin error', error);
    dispatch(userLogoutError(error));
  }
};

export const userRegister = (form) => async (dispatch) => {
  dispatch(userRegisterRequest());

  try {
    const response = await normaService.userRegister(form);
    // console.log('userRegister response', response);
    setRefreshToken(response);
    setAccessToken(response);

    dispatch(userRegisterSucces(response));
  } catch (error) {
    // console.log('userRegister error', error);
    dispatch(userRegisterError(error));
  }
};

export const getUserInfo = () => async (dispatch) => {
  dispatch(userProfileRequest());

  try {
    const response = await normaService.fetchUserInfo();
    // console.log('userInfo response', response);
    dispatch(userProfileSuccess(response.user));
  } catch (error) {
    // console.log('userInfo error', error);
    dispatch(userProfileError(error));
  }
};

export const updateUserInfo = (form) => async (dispatch) => {
  dispatch(updateUserProfileRequest());

  try {
    const response = await normaService.updateUserInfo(form);
    // console.log('updateUserInfo response', response);
    dispatch(updateUserProfileSuccess(response.user));
  } catch (error) {
    // console.log('updateUserInfo error', error);
    dispatch(updateUserProfileError(error));
  }
};

export const forgotUserPassword = (form) => async (dispatch) => {
  dispatch(forgotUserPasswordRequest());
  try {
    const response = await normaService.forgotPassword(form);

    console.log('forgotUserPassword response', response);
    localStorage.setItem('resetEmailSent', true);

    dispatch(forgotUserPasswordSuccess());
  } catch (error) {
    console.log('forgotUserPassword error', error);
    dispatch(forgotUserPasswordError(error));
  }
};

export const resetUserPassword = (form) => async (dispatch) => {
  dispatch(resetUserPasswordRequest());
  try {
    const response = await normaService.resetPassword(form);

    console.log('resetUserPassword response', response);
    localStorage.removeItem('resetEmailSent');

    dispatch(resetUserPasswordSuccess());
  } catch (error) {
    // console.log('resetUserPassword error', error);
    dispatch(resetUserPasswordError(error));
  }
};
