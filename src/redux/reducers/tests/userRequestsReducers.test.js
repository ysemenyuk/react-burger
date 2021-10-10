import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from '../userReducer';

import * as types from '../../constants/constants';

const mapping = [
  ['userLoginReducer', userLoginReducer, types.userLoginMap],
  ['userRegisterReducer', userRegisterReducer, types.userRegisterMap],
  ['userProfileReducer', userProfileReducer, types.userProfileMap],
  ['userUpdateProfileReducer', userUpdateProfileReducer, types.userUpdateProfileMap],
  ['userForgotPasswordReducer', userForgotPasswordReducer, types.userForgotPasswordMap],
  ['userResetPasswordReducer', userResetPasswordReducer, types.userResetPasswordMap],
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
      type: types.error,
      error: 'Network error',
    })
  ).toEqual({
    ...state,
    loading: false,
    error: 'Network error',
  });
});
