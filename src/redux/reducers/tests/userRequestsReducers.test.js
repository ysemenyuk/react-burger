import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from '../userReducer';

import * as types from '../../types/types';

const mapping = [
  [
    'userLoginReducer',
    userLoginReducer,
    {
      request: types.USER_LOGIN_REQUEST,
      success: types.USER_LOGIN_SUCCESS,
      fail: types.USER_LOGIN_FAIL,
    },
  ],
  [
    'userRegisterReducer',
    userRegisterReducer,
    {
      request: types.USER_REGISTER_REQUEST,
      success: types.USER_REGISTER_SUCCESS,
      fail: types.USER_REGISTER_FAIL,
    },
  ],
  [
    'userProfileReducer',
    userProfileReducer,
    {
      request: types.USER_PROFILE_REQUEST,
      success: types.USER_PROFILE_SUCCESS,
      fail: types.USER_PROFILE_FAIL,
    },
  ],
  [
    'userUpdateProfileReducer',
    userUpdateProfileReducer,
    {
      request: types.USER_UPDATE_PROFILE_REQUEST,
      success: types.USER_UPDATE_PROFILE_SUCCESS,
      fail: types.USER_UPDATE_PROFILE_FAIL,
    },
  ],
  [
    'userForgotPasswordReducer',
    userForgotPasswordReducer,
    {
      request: types.USER_FORGOT_PASSWORD_REQUEST,
      success: types.USER_FORGOT_PASSWORD_SUCCESS,
      fail: types.USER_FORGOT_PASSWORD_FAIL,
    },
  ],
  [
    'userResetPasswordReducer',
    userResetPasswordReducer,
    {
      request: types.USER_RESET_PASSWORD_REQUEST,
      success: types.USER_RESET_PASSWORD_SUCCESS,
      fail: types.USER_RESET_PASSWORD_FAIL,
    },
  ],
];

const state = { loading: false, success: false, error: null };

test.each(mapping)('test %s', (_, reducer, types) => {
  // test request
  expect(
    reducer(state, {
      type: types.request,
    })
  ).toEqual({
    ...state,
    loading: true,
  });

  // test success
  expect(
    reducer(state, {
      type: types.success,
    })
  ).toEqual({
    ...state,
    loading: false,
    success: true,
    error: null,
  });

  // test fail
  expect(
    reducer(state, {
      type: types.fail,
      error: { message: 'error' },
    })
  ).toEqual({
    ...state,
    loading: false,
    error: { message: 'error' },
  });
});
