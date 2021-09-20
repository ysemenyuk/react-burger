import {
  USER_CHECK_SUCCESS,
  USER_CHECK_FAIL,
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
  USER_UPDATE_PROFILE_RESET,
} from '../actions/types';

export const userReducer = (
  state = { checkAuth: true, isAuth: false, userInfo: { email: '', name: '' } },
  action
) => {
  switch (action.type) {
    case USER_CHECK_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { checkAuth: false, isAuth: true, userInfo: action.payload };
    case USER_CHECK_FAIL:
    case USER_LOGOUT_SUCCESS:
      return { checkAuth: false, isAuth: false, userInfo: { email: '', name: '' } };
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
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  console.log(111, action);
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
