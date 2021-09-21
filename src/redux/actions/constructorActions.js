import normaService from '../../services/normaService.js';
import {
  ADD_BUN,
  ADD_TOPPING,
  DELETE_TOPPING,
  UPDATE_TOPPINGS_LIST,
  CLEAR_ORDER_ITEMS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER_DETAILS,
} from './types';

export const addBun = (item) => ({
  type: ADD_BUN,
  item: item,
});

export const addTopping = (item) => ({
  type: ADD_TOPPING,
  item: item,
});

export const deleteTopping = (index) => ({
  type: DELETE_TOPPING,
  index: index,
});

export const updateToppingsList = (list) => ({
  type: UPDATE_TOPPINGS_LIST,
  list: list,
});

export const clearOrderItems = () => ({
  type: CLEAR_ORDER_ITEMS,
});

export const createOrderRequest = () => ({
  type: ORDER_REQUEST,
});

export const createOrderSucces = (data) => ({
  type: ORDER_SUCCESS,
  data: data,
});

export const createOrderError = (err) => ({
  type: ORDER_ERROR,
  error: err.message,
});

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS,
});

export const createOrder = (itemsIds) => async (dispatch) => {
  dispatch(createOrderRequest());

  try {
    const resp = await normaService.createOrder(itemsIds);
    dispatch(createOrderSucces(resp.order));
  } catch (error) {
    dispatch(createOrderError(error));
  }
};
