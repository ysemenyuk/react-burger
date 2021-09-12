import {
  ADD_BUN,
  ADD_TOPPING,
  DELETE_TOPPING,
  UPDATE_TOPPINGS_LIST,
  CLEAR_ORDER_ITEMS,
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
