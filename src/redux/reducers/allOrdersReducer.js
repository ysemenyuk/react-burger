import {
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS,
  SET_ORDER_DETAILS,
  RESET_ORDER_DETAILS,
} from '../types/types';

const initialState = {
  wsConnected: false,
  wsError: null,
  allOrders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
  orderDetails: null,
};

export const allOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ALL_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: null,
      };
    case WS_ALL_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };
    case WS_ALL_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload.orders,
        ordersTotal: action.payload.total,
        ordersTotalToday: action.payload.totalToday,
      };
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case RESET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: null,
      };
    default:
      return state;
  }
};
