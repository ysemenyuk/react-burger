import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER,
  ADD_BUN,
  ADD_TOPPING,
  DELETE_TOPPING,
} from '../actions/types';

export const orderItemsReducer = (state = { bun: null, toppings: [] }, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return { ...state, bun: { ...action.item } };
    }
    case ADD_TOPPING: {
      return { ...state, toppings: [...state.toppings, action.item] };
    }
    case DELETE_TOPPING: {
      return [];
    }
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { visible: false, loading: false, error: null, currentOrder: {} },
  action
) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return { ...state, loading: true, visible: true, error: null };
    }
    case ORDER_SUCCESS: {
      return { ...state, loading: false, error: null, currentOrder: { ...action.data } };
    }
    case ORDER_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case CLOSE_ORDER: {
      return { visible: false, loading: false, error: null, currentOrder: {} };
    }
    default:
      return state;
  }
};
