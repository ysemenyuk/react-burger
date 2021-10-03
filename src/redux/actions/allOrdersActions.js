import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  SET_ORDER_DETAILS,
  RESET_ORDER_DETAILS,
  WS_ALL_ORDERS_CONNECTION_FINISH,
} from '../types/types';

export const wsAllOrdersConnectionStart = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionClose = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_FINISH };
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

export const setOrderDetails = (data) => ({
  type: SET_ORDER_DETAILS,
  payload: data,
});

export const resetOrderDetails = () => ({
  type: RESET_ORDER_DETAILS,
});
