import {
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS,
  WS_SHOW_ORDERS_DETAILS,
  WS_CLEAR_ORDERS_DETAILS,
} from '../types/types';

const initialState = {
  connected: false,
  allOrders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
  orderDetails: {},
};

export const wsAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ALL_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case WS_ALL_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        connected: false,
      };
    case WS_ALL_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.orders,
        ordersTotal: action.payload.total,
        ordersTotalToday: action.payload.totalToday,
      };
    case WS_SHOW_ORDERS_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case WS_CLEAR_ORDERS_DETAILS:
      return {
        ...state,
        orderDetails: {},
      };
    default:
      return state;
  }
};
