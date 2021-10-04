import { ingredientsReducer } from '../ingredientsReducer';
import * as types from '../../types/types';

import data from './data';

const state = {
  loading: false,
  success: false,
  error: null,
  items: [],
  itemDetails: null,
};

describe('ingredientsReducer', () => {
  it('ingredientsReducer state', () => {
    expect(ingredientsReducer(state, {})).toEqual(state);
  });

  it('ingredientsReducer INGRIDIENTS_REQUEST', () => {
    const action = {
      type: types.INGRIDIENTS_REQUEST,
    };

    const expectedState = {
      ...state,
      loading: true,
    };

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('ingredientsReducer INGRIDIENTS_SUCCESS', () => {
    const action = {
      type: types.INGRIDIENTS_SUCCESS,
      payload: data,
    };

    const expectedState = {
      ...state,
      loading: false,
      success: true,
      error: null,
      items: data,
    };

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('ingredientsReducer INGRIDIENTS_ERROR', () => {
    const action = {
      type: types.INGRIDIENTS_ERROR,
      error: { message: 'error' },
    };

    const expectedState = {
      ...state,
      loading: false,
      error: { message: 'error' },
    };

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('ingredientsReducer SET_INGREDIENT_DETAILS', () => {
    const action = {
      type: types.SET_INGREDIENT_DETAILS,
      payload: data[0],
    };

    const expectedState = {
      ...state,
      itemDetails: data[0],
    };

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('ingredientsReducer RESET_INGREDIENT_DETAILS', () => {
    const action = {
      type: types.RESET_INGREDIENT_DETAILS,
    };

    const initialState = {
      ...state,
      itemDetails: data[0],
    };

    expect(ingredientsReducer(initialState, action)).toEqual(state);
  });
});
