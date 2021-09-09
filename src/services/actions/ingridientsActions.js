import normaApi from '../normaApi.js';
import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  SET_CURRENT_ITEM,
  RESET_CURRENT_ITEM,
} from './types';

export const getIngridients = () => async (dispatch) => {
  dispatch(ingridientsRequest());

  try {
    const { data } = await normaApi.fetchIngredients();
    dispatch(ingridientsSucces(data));
  } catch (error) {
    dispatch(ingridientsError(error));
  }
};

const ingridientsRequest = () => ({
  type: INGRIDIENTS_REQUEST,
});

const ingridientsSucces = (data) => ({
  type: INGRIDIENTS_SUCCESS,
  items: data,
});

const ingridientsError = (err) => ({
  type: INGRIDIENTS_ERROR,
  payload: err.message,
});

export const setCurrentItem = (item) => ({
  type: SET_CURRENT_ITEM,
  item: { ...item },
});

export const resetCurrentItem = () => ({
  type: RESET_CURRENT_ITEM,
});
