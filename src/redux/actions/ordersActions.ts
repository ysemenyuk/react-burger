import * as types from '../constants/constants';

import {
  TOrder,
  TSetOrderDetails,
  TResetOrderDetails,
  TwsAllOrdersConnectionClose,
  TwsAllOrdersConnectionStart,
  TwsUserOrdersConnectionClose,
  TwsUserOrdersConnectionStart,
} from '../../types/ordersTypes';

export const wsAllOrdersConnectionStart = (): TwsAllOrdersConnectionStart => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionClose = (): TwsAllOrdersConnectionClose => {
  return { type: types.WS_ALL_ORDERS_CONNECTION_FINISH };
};

export const wsUserOrdersConnectionStart = (): TwsUserOrdersConnectionStart => {
  return { type: types.WS_USER_ORDERS_CONNECTION_START };
};

export const wsUserOrdersConnectionClose = (): TwsUserOrdersConnectionClose => {
  return { type: types.WS_USER_ORDERS_CONNECTION_FINISH };
};

export const setOrderDetails = (data: TOrder): TSetOrderDetails => ({
  type: types.SET_ORDER_DETAILS,
  payload: data,
});

export const resetOrderDetails = (): TResetOrderDetails => ({
  type: types.RESET_ORDER_DETAILS,
});
