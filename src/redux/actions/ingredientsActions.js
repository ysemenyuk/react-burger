import normaService from '../../services/normaService.js';
import { INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS, INGRIDIENTS_ERROR } from './types';

const ingredientsRequest = () => ({
  type: INGRIDIENTS_REQUEST,
});

const ingredientsSucces = (data) => ({
  type: INGRIDIENTS_SUCCESS,
  items: data,
});

const ingredientsError = (err) => ({
  type: INGRIDIENTS_ERROR,
  error: err.message,
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
  type: 'SET_CURRENT_INGREDIENT',
  payload: data,
});

export const resetCurrentIngredient = () => ({
  type: 'RESET_CURRENT_INGREDIENT',
});
