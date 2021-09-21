// import checkResponse from '../utils/checkResponse.js';
import { getAccessToken, getRefreshToken } from '../utils/helpers.js';

const NORMA_BASE_URL = 'https://norma.nomoreparties.space/api';
const headers = { 'Content-Type': 'application/json' };

const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const updateRefreshToken = async () =>
  await fetch(`${NORMA_BASE_URL}/auth/token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ token: getRefreshToken() }),
  }).then(checkResponse);

const fetchIngredients = async () =>
  await fetch(`${NORMA_BASE_URL}/ingredients`).then(checkResponse);

const createOrder = async (data) =>
  await fetch(`${NORMA_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getAccessToken(),
    },
    body: JSON.stringify({ ingredients: data }),
  }).then(checkResponse);

const userRegister = async ({ name, email, password }) =>
  await fetch(`${NORMA_BASE_URL}/auth/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);

const userLogin = async ({ email, password }) =>
  await fetch(`${NORMA_BASE_URL}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

const userLogout = async () =>
  await fetch(`${NORMA_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ token: getRefreshToken() }),
  }).then(checkResponse);

const forgotPassword = async ({ email }) =>
  await fetch(`${NORMA_BASE_URL}/password-reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email }),
  }).then(checkResponse);

const resetPassword = async ({ password, token }) =>
  await fetch(`${NORMA_BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, token }),
  }).then(checkResponse);

const fetchUserInfo = async () =>
  await fetch(`${NORMA_BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getAccessToken(),
    },
  }).then(checkResponse);

const updateUserInfo = async ({ name, email, password }) =>
  await fetch(`${NORMA_BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getAccessToken(),
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);

const normaService = {
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
