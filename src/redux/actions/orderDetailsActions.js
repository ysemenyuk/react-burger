import normaService from '../../services/normaService.js';
import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, CLOSE_ORDER_DETAILS } from './types';

export const createOrder = (itemsIds) => async (dispatch) => {
  dispatch(orderRequest());

  try {
    const resp = await normaService.createOrder(itemsIds);
    dispatch(orderSucces(resp.order));
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
  error: err.message,
});

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS,
});
