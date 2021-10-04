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
  CLOSE_ORDER_CREATE_DETAILS,
} from '../types/types';

export const addBun = (item) => ({
  type: ADD_BUN,
  payload: item,
});

export const addTopping = (item) => ({
  type: ADD_TOPPING,
  payload: item,
});

export const deleteTopping = (uuid) => ({
  type: DELETE_TOPPING,
  payload: uuid,
});

export const updateToppingsList = (list) => ({
  type: UPDATE_TOPPINGS_LIST,
  payload: list,
});

export const clearOrderItems = () => ({
  type: CLEAR_ORDER_ITEMS,
});

export const createOrderRequest = () => ({
  type: ORDER_REQUEST,
});

export const createOrderSucces = (data) => ({
  type: ORDER_SUCCESS,
  payload: data,
});

export const createOrderError = (error) => ({
  type: ORDER_ERROR,
  error: error,
});

export const closeCreateOrderDetails = () => ({
  type: CLOSE_ORDER_CREATE_DETAILS,
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
