import * as types from '../redux/constants/constants';

export type TOrder = {
  ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: 'created' | 'pending' | 'done';
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
  readonly name: string;
};

export type TAllOrdersInitialState = {
  wsConnected: boolean;
  wsError: null | string;
  allOrders: Array<TOrder>;
  ordersTotal: number;
  ordersTotalToday: number;
};

export type TUserOrdersInitialState = {
  wsConnected: boolean;
  wsError: null | string;
  userOrders: Array<TOrder>;
};

export type TOrderDetailsInitialState = {
  order: TOrder | null;
};

export type TwsAllOrdersConnectionStart = {
  type: typeof types.WS_ALL_ORDERS_CONNECTION_START;
};

export type TwsAllOrdersConnectionClose = {
  type: typeof types.WS_ALL_ORDERS_CONNECTION_FINISH;
};

export type TwsAllOrdersConnectionSuccess = {
  type: typeof types.WS_ALL_ORDERS_CONNECTION_SUCCESS;
};

export type TwsAllOrdersConnectionError = {
  type: typeof types.WS_ALL_ORDERS_CONNECTION_ERROR;
  payload: string;
};

export type TwsAllOrdersConnectionClosed = {
  type: typeof types.WS_ALL_ORDERS_CONNECTION_CLOSED;
};

export type TwsUserOrdersConnectionStart = {
  type: typeof types.WS_USER_ORDERS_CONNECTION_START;
};

export type TwsUserOrdersConnectionClose = {
  type: typeof types.WS_USER_ORDERS_CONNECTION_FINISH;
};

export type TwsUserOrdersConnectionSuccess = {
  type: typeof types.WS_USER_ORDERS_CONNECTION_SUCCESS;
};

export type TwsUserOrdersConnectionError = {
  type: typeof types.WS_USER_ORDERS_CONNECTION_ERROR;
  payload: string;
};

export type TwsUserOrdersConnectionClosed = {
  type: typeof types.WS_USER_ORDERS_CONNECTION_CLOSED;
};

export type TGetAllOrders = {
  type: typeof types.WS_GET_ALL_ORDERS;
  payload: { orders: Array<TOrder>; totalToday: number; total: number };
};

export type TGetUserOrders = {
  type: typeof types.WS_GET_USER_ORDERS;
  payload: { orders: Array<TOrder> };
};

export type TSetOrderDetails = {
  type: typeof types.SET_ORDER_DETAILS;
  payload: TOrder;
};

export type TResetOrderDetails = {
  type: typeof types.RESET_ORDER_DETAILS;
};

export type TOrdersActions =
  | TwsAllOrdersConnectionStart
  | TwsAllOrdersConnectionClose
  | TwsAllOrdersConnectionSuccess
  | TwsAllOrdersConnectionError
  | TwsAllOrdersConnectionClosed
  | TwsUserOrdersConnectionStart
  | TwsUserOrdersConnectionClose
  | TwsUserOrdersConnectionSuccess
  | TwsUserOrdersConnectionError
  | TwsUserOrdersConnectionClosed
  | TGetAllOrders
  | TGetUserOrders
  | TSetOrderDetails
  | TResetOrderDetails;
