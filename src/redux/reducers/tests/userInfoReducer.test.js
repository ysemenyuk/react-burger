import { userInfoReducer } from '../userReducer';

import * as types from '../../constants/constants';

import { userInfo, updatedUserInfo } from './data';

const state = {
  isCheckAuth: true,
  isAuth: false,
  userInfo: { email: '', name: '' },
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
      userInfo: userInfo,
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
      userInfo: null,
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
      userInfo: userInfo,
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
      userInfo: userInfo,
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
      userInfo: userInfo,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      userInfo: updatedUserInfo,
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
      userInfo: userInfo,
    };

    const expectedState = {
      ...state,
      isCheckAuth: false,
      userInfo: null,
    };

    expect(userInfoReducer(initialState, action)).toEqual(expectedState);
  });
});
