import normaApi from '../normaApi.js';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER,
  ADD_BUN,
  ADD_TOPPING,
} from './types';

export const createOrder = (itemsIds) => async (dispatch) => {
  dispatch(orderRequest());

  try {
    const { data } = await normaApi.createOrder(itemsIds);
    console.log('order', data);
    dispatch(orderSucces(data));
  } catch (error) {
    dispatch(orderError(error));
  }
};

const orderRequest = () => ({
  type: ORDER_REQUEST,
});

const orderSucces = (data) => ({
  type: ORDER_SUCCESS,
  data: data,
});

const orderError = (err) => ({
  type: ORDER_ERROR,
  payload: err.message,
});

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER,
});

export const addBun = (item) => ({
  type: ADD_BUN,
  item: item,
});

export const addTopping = (item) => ({
  type: ADD_TOPPING,
  item: item,
});
