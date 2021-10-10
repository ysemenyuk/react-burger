import * as types from '../constants/constants';

export const wsUserOrdersConnectionStart = () => {
  return { type: types.WS_USER_ORDERS_CONNECTION_START };
};

export const wsUserOrdersConnectionClose = () => {
  return { type: types.WS_USER_ORDERS_CONNECTION_FINISH };
};

export const wsUserOrdersConnectionSuccess = () => {
  return { type: types.WS_USER_ORDERS_CONNECTION_SUCCESS };
};

export const wsUserOrdersConnectionError = () => {
  return { type: types.WS_USER_ORDERS_CONNECTION_ERROR };
};

export const wsUserOrdersConnectionClosed = () => {
  return { type: types.WS_USER_ORDERS_CONNECTION_CLOSED };
};
