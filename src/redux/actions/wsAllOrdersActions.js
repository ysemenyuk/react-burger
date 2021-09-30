import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
} from '../types/types';

export const wsAllOrdersConnectionStart = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionSuccess = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_SUCCESS };
};

export const wsAllOrdersConnectionError = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_ERROR };
};

export const wsAllOrdersConnectionClosed = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_CLOSED };
};
