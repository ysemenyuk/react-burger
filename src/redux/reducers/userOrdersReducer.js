import * as types from '../types/types';

const initialState = {
  wsConnected: false,
  wsError: null,
  userOrders: [],
};

export const userOrdersReducer = (state = initialState, action) => {
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
        ...state,
        wsConnected: false,
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
