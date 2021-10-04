import { allOrdersReducer } from '../allOrdersReducer';
import * as types from '../../types/types';

import { orders, orderDetails } from './data';

const state = {
  wsConnected: false,
  wsError: null,
  allOrders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
  orderDetails: null,
};

describe('allOrdersReducer', () => {
  it('allOrdersReducer state', () => {
    expect(allOrdersReducer(state, {})).toEqual(state);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_SUCCESS', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...state,
      wsConnected: true,
      wsError: null,
    };

    expect(allOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_ERROR', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_ERROR,
      payload: { message: 'error' },
    };

    const expectedState = {
      ...state,
      wsConnected: false,
      wsError: { message: 'error' },
    };

    expect(allOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_ALL_ORDERS_CONNECTION_CLOSED', () => {
    const action = {
      type: types.WS_ALL_ORDERS_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...state,
      wsConnected: false,
    };

    expect(allOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('allOrdersReducer WS_GET_ALL_ORDERS', () => {
    const action = {
      type: types.WS_GET_ALL_ORDERS,
      payload: orders,
    };

    const expectedState = {
      ...state,
      allOrders: orders.orders,
      ordersTotal: orders.total,
      ordersTotalToday: orders.totalToday,
    };

    expect(allOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('allOrdersReducer SET_ORDER_DETAILS', () => {
    const action = {
      type: types.SET_ORDER_DETAILS,
      payload: orderDetails,
    };

    const expectedState = {
      ...state,
      orderDetails: orderDetails,
    };

    expect(allOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('allOrdersReducer RESET_ORDER_DETAILS', () => {
    const action = {
      type: types.RESET_ORDER_DETAILS,
    };

    const initialState = {
      ...state,
      orderDetails: orderDetails,
    };

    expect(allOrdersReducer(initialState, action)).toEqual(state);
  });
});
