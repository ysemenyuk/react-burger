import normaService from '../../services/normaService';
import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../types/types';

const ingredientsRequest = () => ({
  type: INGREDIENTS_REQUEST,
});

const ingredientsSucces = (data) => ({
  type: INGREDIENTS_SUCCESS,
  payload: data,
});

const ingredientsError = (error) => ({
  type: INGREDIENTS_ERROR,
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
