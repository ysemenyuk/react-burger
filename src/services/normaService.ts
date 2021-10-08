import {
  TForgotPassword,
  TIngredient,
  TResetPassword,
  TUpdateUserInfo,
  TUserLogin,
  TUserRegister,
} from '../types/types';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/helpers.js';

const NORMA_BASE_URL = 'https://norma.nomoreparties.space/api';
const contentType = { 'Content-Type': 'application/json' };

const checkResponse = (response: any): Promise<any> =>
  response.ok ? response.json() : response.json().then((err: any) => Promise.reject(err));

const baseFetch = async (url: string, options: any) => {
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

const authFetch = async (url: string, options: any): Promise<any> => {
  try {
    options = { ...options, headers: { Authorization: `Bearer ${getAccessToken()}` } };
    return await baseFetch(url, options);
  } catch (error: any) {
    console.log('authFetch error', error);

    if (error.message === 'jwt expired') {
      const updatedTokens = await updateRefreshToken();

      setRefreshToken(updatedTokens);
      setAccessToken(updatedTokens);

      options.headers = { Authorization: `Bearer ${getAccessToken()}` };
      return await baseFetch(url, options);
    } else {
      return Promise.reject(error);
    }
  }
};

const fetchAllOrders = async (): Promise<any> => await baseFetch(`/orders/all`, { method: 'GET' });

const fetchUserOrders = async (): Promise<any> => await authFetch(`/orders`, { method: 'GET' });

const fetchIngredients = async (): Promise<{
  success: boolean;
  data: Array<TIngredient>;
}> => await baseFetch(`/ingredients`, { method: 'GET' });

const fetchUserInfo = async (): Promise<any> => await authFetch(`/auth/user`, { method: 'GET' });

const createOrder = async (data: Array<string>): Promise<any> =>
  await authFetch(`/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients: data }),
  });

const userRegister = async ({ name, email, password }: TUserRegister): Promise<any> =>
  await baseFetch(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

const userLogin = async ({ email, password }: TUserLogin): Promise<any> =>
  await baseFetch(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

const userLogout = async (): Promise<any> =>
  await baseFetch(`/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({ token: getRefreshToken() }),
  });

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

const updateUserInfo = async ({ name, email, password }: TUpdateUserInfo): Promise<any> =>
  await authFetch(`/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({ name, email, password }),
  });

const normaService = {
  fetchAllOrders,
  fetchUserOrders,
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
