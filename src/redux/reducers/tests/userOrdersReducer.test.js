import { userOrdersReducer } from '../userOrdersReducer';
import * as types from '../../constants/constants';

import { orders } from './data';

const state = {
  wsConnected: false,
  wsError: null,
  userOrders: [],
};

describe('userOrdersReducer', () => {
  it('userOrdersReducer state', () => {
    expect(userOrdersReducer(state, {})).toEqual(state);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...state,
      wsConnected: true,
      wsError: null,
    };

    expect(userOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_ERROR', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_ERROR,
      payload: { message: 'error' },
    };

    const expectedState = {
      ...state,
      wsConnected: false,
      wsError: { message: 'error' },
    };

    expect(userOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_USER_ORDERS_CONNECTION_CLOSED', () => {
    const action = {
      type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...state,
      wsConnected: false,
    };

    expect(userOrdersReducer(state, action)).toEqual(expectedState);
  });

  it('userOrdersReducer WS_GET_USER_ORDERS', () => {
    const action = {
      type: types.WS_GET_USER_ORDERS,
      payload: orders,
    };

    const expectedState = {
      ...state,
      userOrders: [...orders.orders].reverse(),
    };

    expect(userOrdersReducer(state, action)).toEqual(expectedState);
  });
});
