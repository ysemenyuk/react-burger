import { combineReducers } from 'redux';
import * as types from '../constants/constants';

import {
  TAllOrdersInitialState,
  TOrderDetailsInitialState,
  TOrdersActions,
  TUserOrdersInitialState,
} from '../../types/ordersTypes';

const allOrdersInitialState: TAllOrdersInitialState = {
  wsConnected: false,
  wsError: null,
  allOrders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
};

export const allOrdersReducer = (
  state = allOrdersInitialState,
  action: TOrdersActions
): TAllOrdersInitialState => {
  switch (action.type) {
    case types.WS_ALL_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: null,
      };
    case types.WS_ALL_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };
    case types.WS_ALL_ORDERS_CONNECTION_CLOSED:
      return {
        ...allOrdersInitialState,
      };
    case types.WS_GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.orders.filter(
          (order) => order.ingredients && !!order.ingredients.length
        ),
        ordersTotal: action.payload.total,
        ordersTotalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};

const userOrdersInitialState: TUserOrdersInitialState = {
  wsConnected: false,
  wsError: null,
  userOrders: [],
};

export const userOrdersReducer = (
  state = userOrdersInitialState,
  action: TOrdersActions
): TUserOrdersInitialState => {
  switch (action.type) {
    case types.WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: null,
      };
    case types.WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };
    case types.WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...userOrdersInitialState,
      };
    case types.WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: [...action.payload.orders]
          .filter((order) => order.ingredients && !!order.ingredients.length)
          .reverse(),
      };
    default:
      return state;
  }
};

const orederDetailsInitialState: TOrderDetailsInitialState = { order: null };

export const orederDetailsReducer = (
  state = orederDetailsInitialState,
  action: TOrdersActions
): TOrderDetailsInitialState => {
  switch (action.type) {
    case types.SET_ORDER_DETAILS:
      return {
        ...state,
        order: action.payload,
      };
    case types.RESET_ORDER_DETAILS:
      return {
        ...state,
        order: null,
      };
    default:
      return state;
  }
};

export const ordersReducer = combineReducers({
  allOrders: allOrdersReducer,
  userOrders: userOrdersReducer,
  orederDetails: orederDetailsReducer,
});
