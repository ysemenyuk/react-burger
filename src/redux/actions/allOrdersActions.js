import * as types from '../constants/constants';

export const wsAllOrdersConnectionStart = () => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionClose = () => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_FINISH };
};

export const wsAllOrdersConnectionSuccess = () => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS };
};

export const wsAllOrdersConnectionError = () => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_ERROR };
};

export const wsAllOrdersConnectionClosed = () => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_CLOSED };
};

export const setOrderDetails = (data) => ({
  type: types.SET_ORDER_DETAILS,
  payload: data,
});

export const resetOrderDetails = () => ({
  type: types.RESET_ORDER_DETAILS,
});
