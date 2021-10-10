import normaService from '../../services/normaService';
import { AppThunk } from '../../types/thunkTypes';
import { AppDispatch } from '../store';
import * as types from '../constants/constants';

import {
  TForgotPassword,
  TResetPassword,
  TUpdateUserInfo,
  TUserCheckAuthFail,
  TUserLogin,
  TUserRegister,
} from '../../types/userTypes';

export const userAuthFail = (): TUserCheckAuthFail => ({
  type: types.USER_CHECK_AUTH_FAIL,
});

export const checkUserAuth: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: types.USER_CHECK_AUTH_REQUEST });
    const response = await normaService.fetchUserInfo();
    dispatch({ type: types.USER_CHECK_AUTH_SUCCESS, payload: response.user });
  } catch (error) {
    dispatch({ type: types.USER_CHECK_AUTH_ERROR, error: error });
  }
};

export const userRegister: AppThunk =
  ({ name, email, password }: TUserRegister) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.USER_REGISTER_REQUEST });
      const { user } = await normaService.userRegister({ name, email, password });
      dispatch({ type: types.USER_REGISTER_SUCCESS, payload: user });
    } catch (error) {
      // console.log('userRegister error', error);
      dispatch({ type: types.USER_REGISTER_ERROR, error: error });
    }
  };

export const userLogin: AppThunk =
  ({ email, password }: TUserLogin) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.USER_LOGIN_REQUEST });
      const { user } = await normaService.userLogin({ email, password });
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: user });
    } catch (error) {
      // console.log('userLogin error', error);
      dispatch({ type: types.USER_LOGIN_ERROR, error: error });
    }
  };

export const userLogout: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: types.USER_LOGOUT_REQUEST });
    await normaService.userLogout();
    dispatch({ type: types.USER_LOGOUT_SUCCESS });
  } catch (error) {
    // console.log('userLogout error', error);
    dispatch({ type: types.USER_LOGOUT_ERROR, error: error });
  }
};

export const getUserInfo: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: types.USER_PROFILE_REQUEST });
    const { user } = await normaService.fetchUserInfo();
    dispatch({ type: types.USER_PROFILE_SUCCESS, payload: user });
  } catch (error) {
    // console.log('getUserInfo error', error);
    dispatch({ type: types.USER_PROFILE_ERROR, error: error });
  }
};

export const updateUserInfo: AppThunk =
  ({ name, email, password }: TUpdateUserInfo) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST });
      const { user } = await normaService.updateUserInfo({ name, email, password });
      dispatch({ type: types.USER_UPDATE_PROFILE_SUCCESS, payload: user });
    } catch (error) {
      // console.log('updateUserInfo error', error);
      dispatch({ type: types.USER_UPDATE_PROFILE_ERROR, error: error });
    }
  };

export const forgotUserPassword: AppThunk =
  ({ email }: TForgotPassword) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.USER_FORGOT_PASSWORD_REQUEST });
      await normaService.forgotPassword({ email });

      // console.log('forgotUserPassword response', response);
      localStorage.setItem('resetEmailSent', 'true');

      dispatch({ type: types.USER_FORGOT_PASSWORD_SUCCESS });
    } catch (error) {
      // console.log('forgotUserPassword error', error);
      dispatch({ type: types.USER_FORGOT_PASSWORD_ERROR, error: error });
    }
  };

export const resetUserPassword: AppThunk =
  ({ password, token }: TResetPassword) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.USER_RESET_PASSWORD_REQUEST });
      await normaService.resetPassword({ password, token });

      // console.log('resetUserPassword response', response);
      localStorage.removeItem('resetEmailSent');

      dispatch({ type: types.USER_RESET_PASSWORD_SUCCESS });
    } catch (error) {
      // console.log('resetUserPassword error', error);
      dispatch({ type: types.USER_RESET_PASSWORD_ERROR, error: error });
    }
  };
