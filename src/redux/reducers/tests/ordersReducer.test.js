import { allOrdersReducer, orederDetailsReducer, userOrdersReducer } from '../ordersReducer';
import * as types from '../../constants/constants';

import { orders, orderDetails } from './data';

const allOrdersState = {
  wsConnected: false,
  wsError: null,
  allOrders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
};

const userOrdersState = {
  wsConnected: false,
  wsError: null,
  userOrders: [],
};

const orderDetailsState = {
  order: null,
};

describe('allOrdersReducer', () => {
  it('allOrdersReducer state', () => {
    expect(allOrdersReducer(allOrdersState, {})).toEqual(allOrdersState);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_SUCCESS', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...allOrdersState,
      wsConnected: true,
      wsError: null,
    };

    expect(allOrdersReducer(allOrdersState, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_ERROR', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_ERROR,
      payload: { message: 'error' },
    };

    const expectedState = {
      ...allOrdersState,
      wsConnected: false,
      wsError: { message: 'error' },
    };

    expect(allOrdersReducer(allOrdersState, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_CLOSED', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...allOrdersState,
      wsConnected: false,
    };

    expect(allOrdersReducer(allOrdersState, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_GET_ALL_ORDERS', () => {
    const action = {
      type: types.WS_GET_ALL_ORDERS,
      payload: orders,
    };

    const expectedState = {
      ...allOrdersState,
      allOrders: orders.orders,
      ordersTotal: orders.total,
      ordersTotalToday: orders.totalToday,
    };

    expect(allOrdersReducer(allOrdersState, action)).toEqual(expectedState);
  });
});

describe('userOrdersReducer', () => {
  it('userOrdersReducer state', () => {
    expect(userOrdersReducer(userOrdersState, {})).toEqual(userOrdersState);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...userOrdersState,
      wsConnected: true,
      wsError: null,
    };

    expect(userOrdersReducer(userOrdersState, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_ERROR', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_ERROR,
      payload: { message: 'error' },
    };

    const expectedState = {
      ...userOrdersState,
      wsConnected: false,
      wsError: { message: 'error' },
    };

    expect(userOrdersReducer(userOrdersState, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_CLOSED', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...userOrdersState,
      wsConnected: false,
    };

    expect(userOrdersReducer(userOrdersState, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_GET_USER_ORDERS', () => {
    const action = {
      type: types.WS_GET_USER_ORDERS,
      payload: orders,
    };

    const expectedState = {
      ...userOrdersState,
      userOrders: [...orders.orders].reverse(),
    };

    expect(userOrdersReducer(userOrdersState, action)).toEqual(expectedState);
  });
});

describe('orderDetailsReducer', () => {
  it('orderDetailsReducer SET_ORDER_DETAILS', () => {
    const action = {
      type: types.SET_ORDER_DETAILS,
      payload: orderDetails,
    };

    const expectedState = {
      ...orderDetailsState,
      order: orderDetails,
    };

    expect(orederDetailsReducer(orderDetailsState, action)).toEqual(expectedState);
  });

  it('orderDetailsReducer RESET_ORDER_DETAILS', () => {
    const action = {
      type: types.RESET_ORDER_DETAILS,
    };

    const initialState = {
      ...orderDetailsState,
      order: orderDetails,
    };

    expect(orederDetailsReducer(initialState, action)).toEqual(orderDetailsState);
  });
});
