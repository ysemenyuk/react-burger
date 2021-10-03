import {
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
} from '../types/types';

const initialState = {
  wsConnected: false,
  wsError: null,
  userOrders: [],
};

export const userOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: null,
      };
    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };
    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders:
          action.payload.orders
            .filter((order) => order.ingredients && !!order.ingredients.length)
            .reverse() || [],
      };
    default:
      return state;
  }
};
