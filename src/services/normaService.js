import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/helpers.js';

const NORMA_BASE_URL = 'https://norma.nomoreparties.space/api';
const headers = { 'Content-Type': 'application/json' };

const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const baseFetch = async (url, options = { headers: {} }) => {
  options.headers = { ...options.headers, ...headers };
  return await fetch(`${NORMA_BASE_URL}${url}`, options).then(checkResponse);
};

const updateRefreshToken = async () =>
  await baseFetch(`/auth/token`, {
    method: 'POST',
    body: JSON.stringify({ token: getRefreshToken() }),
  });

const authFetch = async (url, options = { headers: {} }) => {
  try {
    options.headers = { Authorization: `Bearer ${getAccessToken()}` };
    return await baseFetch(url, options);
  } catch (error) {
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

const fetchAllOrders = async () => await baseFetch(`/orders/all`, { method: 'GET' });

const fetchUserOrders = async () => await authFetch(`/orders`, { method: 'GET' });

const fetchIngredients = async () => await baseFetch(`/ingredients`, { method: 'GET' });

const fetchUserInfo = async () => await authFetch(`/auth/user`, { method: 'GET' });

const createOrder = async (data) =>
  await authFetch(`/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients: data }),
  });

const userRegister = async ({ name, email, password }) =>
  await baseFetch(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

const userLogin = async ({ email, password }) =>
  await baseFetch(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

const userLogout = async () =>
  await baseFetch(`/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({ token: getRefreshToken() }),
  });

const forgotPassword = async ({ email }) =>
  await baseFetch(`/password-reset`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

const resetPassword = async ({ password, token }) =>
  await baseFetch(`/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({ password, token }),
  });

const updateUserInfo = async ({ name, email, password }) =>
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
