import normaService from '../../services/normaService.js';
import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from '../../utils/types';

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

export const getIngredients = () => async (dispatch) => {
  dispatch(ingredientsRequest());

  try {
    const { data } = await normaService.fetchIngredients();
    dispatch(ingredientsSucces(data));
  } catch (error) {
    dispatch(ingredientsError(error));
  }
};

export const setCurrentIngredient = (data) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: data,
});

export const resetCurrentIngredient = () => ({
  type: RESET_CURRENT_INGREDIENT,
});
