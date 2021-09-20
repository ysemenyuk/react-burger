import normaService from '../../services/normaService.js';
import { INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS, INGRIDIENTS_ERROR } from './types';

const ingridientsRequest = () => ({
  type: INGRIDIENTS_REQUEST,
});

const ingridientsSucces = (data) => ({
  type: INGRIDIENTS_SUCCESS,
  items: data,
});

const ingridientsError = (err) => ({
  type: INGRIDIENTS_ERROR,
  error: err.message,
});

export const getIngridients = () => async (dispatch) => {
  dispatch(ingridientsRequest());

  try {
    const { data } = await normaService.fetchIngredients();
    dispatch(ingridientsSucces(data));
  } catch (error) {
    dispatch(ingridientsError(error));
  }
};
