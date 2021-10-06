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
  ['userLoginReducer', userLoginReducer, types.userLogin],
  ['userRegisterReducer', userRegisterReducer, types.userRegister],
  ['userProfileReducer', userProfileReducer, types.userProfile],
  ['userUpdateProfileReducer', userUpdateProfileReducer, types.userUpdateProfile],
  ['userForgotPasswordReducer', userForgotPasswordReducer, types.userForgotPassword],
  ['userResetPasswordReducer', userResetPasswordReducer, types.userResetPassword],
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
