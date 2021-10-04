import normaService from '../../services/normaService.js';
import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../types/types';

const ingredientsRequest = () => ({
  type: INGRIDIENTS_REQUEST,
});

const ingredientsSucces = (data) => ({
  type: INGRIDIENTS_SUCCESS,
  payload: data,
});

const ingredientsError = (error) => ({
  type: INGRIDIENTS_ERROR,
  error: error,
});

export const setIngredientDetails = (data) => ({
  type: SET_INGREDIENT_DETAILS,
  payload: data,
});

export const resetIngredientDetails = () => ({
  type: RESET_INGREDIENT_DETAILS,
});

export const getIngredients = () => async (dispatch) => {
  dispatch(ingredientsRequest());

  try {
    const { data } = await normaService.fetchIngredients();
    dispatch(ingredientsSucces(data));
  } catch (error) {
    dispatch(ingredientsError(error));
  }
};
