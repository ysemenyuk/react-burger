import { userInfoReducer } from '../userReducer';

import * as types from '../../constants/constants';

import { userInfo, updatedUserInfo } from './data';

const state = {
  isCheckAuth: true,
  isAuth: false,
  user: { email: '', name: '' },
};

describe('userInfoReducer', () => {
  it('userInfoReducer state', () => {
    expect(userInfoReducer(state, {})).toEqual(state);
  });

  it('userInfoReducer USER_CHECK_AUTH_SUCCESS', () => {
    const action = {
      type: types.USER_CHECK_AUTH_SUCCESS,
      payload: userInfo,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      isAuth: true,
      user: userInfo,
    };

    expect(userInfoReducer(state, action)).toEqual(expectedState);
  });

  it('userInfoReducer USER_CHECK_AUTH_FAIL', () => {
    const action = {
      type: types.USER_CHECK_AUTH_FAIL,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      isAuth: false,
      user: null,
    };

    expect(userInfoReducer(state, action)).toEqual(expectedState);
  });

  it('userInfoReducer USER_LOGIN_SUCCESS', () => {
    const action = {
      type: types.USER_LOGIN_SUCCESS,
      payload: userInfo,
    };

    const expectedState = {
      ...state,
      isAuth: true,
      user: userInfo,
    };

    expect(userInfoReducer(state, action)).toEqual(expectedState);
  });

  it('userInfoReducer USER_REGISTER_SUCCESS', () => {
    const action = {
      type: types.USER_REGISTER_SUCCESS,
      payload: userInfo,
    };

    const expectedState = {
      ...state,
      isAuth: true,
      user: userInfo,
    };

    expect(userInfoReducer(state, action)).toEqual(expectedState);
  });

  it('userInfoReducer USER_UPDATE_PROFILE_SUCCESS', () => {
    const action = {
      type: types.USER_UPDATE_PROFILE_SUCCESS,
      payload: updatedUserInfo,
    };

    const initialState = {
      ...state,
      isCheckAuth: false,
      user: userInfo,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      user: updatedUserInfo,
    };

    expect(userInfoReducer(initialState, action)).toEqual(expectedState);
  });

  it('userInfoReducer USER_LOGOUT_SUCCESS', () => {
    const action = {
      type: types.USER_LOGOUT_SUCCESS,
    };

    const initialState = {
      ...state,
      isCheckAuth: false,
      user: userInfo,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      user: null,
    };

    expect(userInfoReducer(initialState, action)).toEqual(expectedState);
  });
});
