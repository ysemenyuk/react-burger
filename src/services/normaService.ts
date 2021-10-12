import { TCreatedOrder } from '../types/constructorTypes';
import { TIngredient } from '../types/ingredientsTypes';
import {
  TForgotPassword,
  TResetPassword,
  TUpdateUserInfo,
  TUser,
  TUserLogin,
  TUserRegister,
} from '../types/userTypes';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/helpers.js';

const NORMA_BASE_URL = 'https://norma.nomoreparties.space/api';
const contentType = { 'Content-Type': 'application/json' };

export type TRequestOptions = {
  method: string;
  headers?: { [key: string]: string };
  body?: string;
};

const checkResponse = (response: any): Promise<any> =>
  response.ok ? response.json() : response.json().then((err: any) => Promise.reject(err));

const baseFetch = async (url: string, options: TRequestOptions) => {
  options = {
    ...options,
    headers: { ...(options && options.headers && options.headers), ...contentType },
  };
  return await fetch(`${NORMA_BASE_URL}${url}`, options).then(checkResponse);
};

const updateRefreshToken = async (): Promise<any> =>
  await baseFetch(`/auth/token`, {
    method: 'POST',
    body: JSON.stringify({ token: getRefreshToken() }),
  });

const authFetch = async (url: string, options: TRequestOptions): Promise<any> => {
  try {
    options = { ...options, headers: { Authorization: `Bearer ${getAccessToken()}` } };
    return await baseFetch(url, options);
  } catch (error: any) {
    console.log('authFetch error', error);

    if (error.message === 'jwt expired' || error.message === 'jwt malformed') {
      const response = await updateRefreshToken();

      setRefreshToken(response);
      setAccessToken(response);

      options.headers = { Authorization: `Bearer ${getAccessToken()}` };
      return await baseFetch(url, options);
    } else {
      return Promise.reject(error);
    }
  }
};

// const fetchAllOrders = async (): Promise<any> => await baseFetch(`/orders/all`, { method: 'GET' });
// const fetchUserOrders = async (): Promise<any> => await authFetch(`/orders`, { method: 'GET' });

const fetchIngredients = async (): Promise<{ ingredients: Array<TIngredient> }> => {
  const response = await baseFetch(`/ingredients`, { method: 'GET' });
  return { ingredients: response.data };
};

const createOrder = async (data: Array<string>): Promise<{ order: TCreatedOrder }> => {
  const response = await authFetch(`/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients: data }),
  });

  const order = { number: response.order.number, name: response.order.name };
  return { order };
};

const fetchUserInfo = async (): Promise<{ user: TUser }> => {
  const response = await authFetch(`/auth/user`, { method: 'GET' });
  return { user: response.user };
};

const updateUserInfo = async ({
  name,
  email,
  password,
}: TUpdateUserInfo): Promise<{ user: TUser }> => {
  const response = await authFetch(`/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({ name, email, password }),
  });

  return { user: response.user };
};

const userRegister = async ({
  name,
  email,
  password,
}: TUserRegister): Promise<{ user: TUser }> => {
  const response = await baseFetch(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  // console.log('userRegister response', response);
  setRefreshToken(response);
  setAccessToken(response);

  return { user: response.user };
};

const userLogin = async ({ email, password }: TUserLogin): Promise<{ user: TUser }> => {
  const response = await baseFetch(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // console.log('userLogin response', response);
  setRefreshToken(response);
  setAccessToken(response);

  return { user: response.user };
};

const userLogout = async (): Promise<any> => {
  await baseFetch(`/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({ token: getRefreshToken() }),
  });

  // console.log('userLogout response', response);
  removeRefreshToken();
  removeAccessToken();
};

const forgotPassword = async ({ email }: TForgotPassword): Promise<any> =>
  await baseFetch(`/password-reset`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

const resetPassword = async ({ password, token }: TResetPassword): Promise<any> =>
  await baseFetch(`/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({ password, token }),
  });

const normaService = {
  // fetchAllOrders,
  // fetchUserOrders,
  fetchIngredients,
  createOrder,
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  updateRefreshToken,
  fetchUserInfo,
  updateUserInfo,
};

export default normaService;
