import normaService from '../../services/normaService';
import { AppThunk } from '../../types/thunkTypes';
import { AppDispatch } from '../store';
import * as types from '../constants/constants';
import {
  TIngredient,
  TResetIngredientDetails,
  TSetIngredientDetails,
} from '../../types/ingredientsTypes';

export const setIngredientDetails = (data: TIngredient): TSetIngredientDetails => ({
  type: types.SET_INGREDIENT_DETAILS,
  payload: data,
});

export const resetIngredientDetails = (): TResetIngredientDetails => ({
  type: types.RESET_INGREDIENT_DETAILS,
});

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: types.INGREDIENTS_REQUEST });
    const { ingredients } = await normaService.fetchIngredients();
    dispatch({ type: types.INGREDIENTS_SUCCESS, payload: ingredients });
  } catch (error) {
    dispatch({ type: types.INGREDIENTS_ERROR, error: error });
  }
};
