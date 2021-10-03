import { ingredientsReducer } from '../ingredientsReducer';
import * as types from '../../types/types';

import data from '../../../utils/data';

const initState = {
  loading: false,
  success: false,
  error: null,
  items: [],
  itemDetails: null,
};

describe('ingredientsReducer', () => {
  it('ingredientsReducer initState', () => {
    expect(ingredientsReducer(initState, {})).toEqual(initState);
  });

  it('ingredientsReducer INGRIDIENTS_REQUEST', () => {
    const action = {
      type: types.INGRIDIENTS_REQUEST,
      payload: data,
    };

    const expectedState = {
      loading: true,
      success: false,
      error: null,
      items: [],
      itemDetails: null,
    };

    expect(ingredientsReducer(initState, action)).toEqual(expectedState);
  });

  it('ingredientsReducer INGRIDIENTS_SUCCESS', () => {
    const action = {
      type: types.INGRIDIENTS_SUCCESS,
      payload: data,
    };

    const expectedState = {
      loading: false,
      success: true,
      error: null,
      items: data,
      itemDetails: null,
    };

    expect(ingredientsReducer(initState, action)).toEqual(expectedState);
  });

  it('ingredientsReducer INGRIDIENTS_ERROR', () => {
    const action = {
      type: types.INGRIDIENTS_ERROR,
      error: { message: 'error' },
    };

    const expectedState = {
      loading: false,
      success: false,
      error: { message: 'error' },
      items: [],
      itemDetails: null,
    };

    expect(ingredientsReducer(initState, action)).toEqual(expectedState);
  });

  it('ingredientsReducer SET_INGREDIENT_DETAILS', () => {
    const action = {
      type: types.SET_INGREDIENT_DETAILS,
      payload: data[0],
    };

    const expectedState = {
      loading: false,
      success: false,
      error: null,
      items: [],
      itemDetails: data[0],
    };

    expect(ingredientsReducer(initState, action)).toEqual(expectedState);
  });

  it('ingredientsReducer RESET_INGREDIENT_DETAILS', () => {
    const action = {
      type: types.RESET_INGREDIENT_DETAILS,
    };

    const initialState = {
      loading: false,
      success: false,
      error: null,
      items: [],
      itemDetails: data[0],
    };

    const expectedState = {
      loading: false,
      success: false,
      error: null,
      items: [],
      itemDetails: null,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
