import { constructorReducer } from '../constructorReducer';
import * as types from '../../constants/constants';

import { data, bun, topping, uuid, order } from './data';

const state = {
  bun: null,
  toppings: [],
  visible: false,
  loading: false,
  error: null,
  order: null,
};

describe('constructorReducer', () => {
  it('constructorReducer state', () => {
    expect(constructorReducer(state, {})).toEqual(state);
  });

  it('constructorReducer ADD_BUN', () => {
    const action = {
      type: types.ADD_BUN,
      payload: bun,
    };

    const expectedState = {
      ...state,
      bun: bun,
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer ADD_TOPPING', () => {
    const action = {
      type: types.ADD_TOPPING,
      payload: { ...topping, uuid },
    };

    const expectedState = {
      ...state,
      toppings: [{ ...topping, uuid }],
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer DELETE_TOPPING', () => {
    const action = {
      type: types.DELETE_TOPPING,
      payload: uuid,
    };

    const initialState = {
      ...state,
      toppings: [{ ...topping, uuid }],
    };

    expect(constructorReducer(initialState, action)).toEqual(state);
  });

  it('constructorReducer UPDATE_TOPPINGS_LIST', () => {
    const toppings = data.filter((i) => i.type === 'main');

    const action = {
      type: types.UPDATE_TOPPINGS_LIST,
      payload: toppings,
    };

    const expectedState = {
      ...state,
      toppings: toppings,
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer CLEAR_ORDER_ITEMS', () => {
    const action = {
      type: types.CLEAR_ORDER_ITEMS,
    };

    const initialState = {
      ...state,
      bun: bun,
      toppings: [{ ...topping, uuid }],
    };

    expect(constructorReducer(initialState, action)).toEqual(state);
  });

  it('constructorReducer ORDER_REQUEST', () => {
    const action = {
      type: types.ORDER_REQUEST,
    };

    const expectedState = {
      ...state,
      loading: true,
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer ORDER_SUCCESS', () => {
    const action = {
      type: types.ORDER_SUCCESS,
      payload: order,
    };

    const expectedState = {
      ...state,
      loading: false,
      visible: true,
      error: null,
      order: order,
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer ORDER_ERROR', () => {
    const action = {
      type: types.ORDER_ERROR,
      error: 'Network error',
    };

    const expectedState = {
      ...state,
      loading: false,
      visible: true,
      error: 'Network error',
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

  it('constructorReducer CLOSE_ORDER_CREATE_DETAILS', () => {
    const action = {
      type: types.CLOSE_ORDER_CREATE_DETAILS,
    };

    const expectedState = {
      ...state,
      visible: false,
      order: null,
    };

    expect(constructorReducer(state, action)).toEqual(expectedState);
  });
});
