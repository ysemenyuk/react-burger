import * as types from '../constants/constants';

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
        ...initialState,
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
    case types.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case types.RESET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: null,
      };
    default:
      return state;
  }
};
