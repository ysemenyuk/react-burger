import normaService from '../../services/normaService';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/tokens';
import {
  USER_CHECK_SUCCESS,
  USER_CHECK_FAIL,
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
} from '../actions/types';

// actionCreators

const checkUserSuccess = (user) => ({
  type: USER_CHECK_SUCCESS,
  payload: user,
});

const checkUserFail = (error) => ({
  type: USER_CHECK_FAIL,
  payload: error,
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
  payload: error,
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
  payload: error,
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
  payload: error,
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
  payload: error,
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
  payload: error,
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
  payload: error,
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
  payload: error,
});

// thunks

export const checkUser = () => async (dispatch) => {
  if (!getRefreshToken()) {
    dispatch(checkUserFail());
    return;
  }

  try {
    const resp = await normaService.refreshToken();

    setRefreshToken(resp);
    setAccessToken(resp);

    const { user } = await normaService.fetchUserInfo();

    dispatch(checkUserSuccess(user));
  } catch (error) {
    removeRefreshToken();
    removeAccessToken();

    dispatch(checkUserFail());
  }
};

export const userLogin = (form) => async (dispatch) => {
  dispatch(userLoginRequest());

  try {
    const resp = await normaService.userLogin(form);
    // console.log('userLogin resp', resp);
    setRefreshToken(resp);
    setAccessToken(resp);

    dispatch(userLoginSuccess(resp.user));
  } catch (error) {
    // console.log('userLogin error', error);
    dispatch(userLoginError(error));
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(userLogoutRequest());

  try {
    const resp = await normaService.userLogout();
    // console.log('userLogin resp', resp);
    removeRefreshToken(resp);
    removeAccessToken(resp);

    dispatch(userLogoutSuccess());
  } catch (error) {
    // console.log('userLogin error', error);
    dispatch(userLogoutError(error));
  }
};

export const userRegister = (form) => async (dispatch) => {
  dispatch(userRegisterRequest());

  try {
    const resp = await normaService.userRegister(form);
    // console.log('userRegister resp', resp);
    setRefreshToken(resp);
    setAccessToken(resp);

    dispatch(userRegisterSucces(resp));
  } catch (error) {
    // console.log('userRegister error', error);
    dispatch(userRegisterError(error.message));
  }
};

export const getUserInfo = () => async (dispatch) => {
  dispatch(userProfileRequest());
  try {
    const resp = await normaService.fetchUserInfo();
    // console.log('userInfo resp', resp);
    dispatch(userProfileSuccess(resp.user));
  } catch (error) {
    // console.log('userInfo error', error);
    dispatch(userProfileError(error));
  }
};

export const updateUserInfo = (form) => async (dispatch) => {
  dispatch(updateUserProfileRequest());
  try {
    const resp = await normaService.updateUserInfo(form);
    // console.log('updateUserInfo resp', resp);
    dispatch(updateUserProfileSuccess(resp.user));
  } catch (error) {
    // console.log('updateUserInfo error', error);
    dispatch(updateUserProfileError(error));
  }
};

export const forgotUserPassword = (form) => async (dispatch) => {
  dispatch(forgotUserPasswordRequest());
  try {
    const resp = await normaService.forgotPassword(form);

    console.log('forgotUserPassword resp', resp);
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
    const resp = await normaService.resetPassword(form);

    console.log('resetUserPassword resp', resp);
    localStorage.removeItem('resetEmailSent');

    dispatch(resetUserPasswordSuccess());
  } catch (error) {
    console.log('resetUserPassword error', error);
    dispatch(resetUserPasswordError(error));
  }
};
