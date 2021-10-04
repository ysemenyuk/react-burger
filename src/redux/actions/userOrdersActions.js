import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_FINISH,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
} from '../types/types';

export const wsUserOrdersConnectionStart = () => {
  return { type: WS_USER_ORDERS_CONNECTION_START };
};

export const wsUserOrdersConnectionClose = () => {
  return { type: WS_USER_ORDERS_CONNECTION_FINISH };
};

export const wsUserOrdersConnectionSuccess = () => {
  return { type: WS_USER_ORDERS_CONNECTION_SUCCESS };
};

export const wsUserOrdersConnectionError = () => {
  return { type: WS_USER_ORDERS_CONNECTION_ERROR };
};

export const wsUserOrdersConnectionClosed = () => {
  return { type: WS_USER_ORDERS_CONNECTION_CLOSED };
};
