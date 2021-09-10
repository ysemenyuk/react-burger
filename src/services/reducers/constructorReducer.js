import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLOSE_ORDER_DETAILS,
  ADD_BUN,
  ADD_TOPPING,
  DELETE_TOPPING,
  UPDATE_TOPPINGS_LIST,
  CLEAR_ORDER_ITEMS,
} from '../actions/types';

const orderItemsInitialState = { bun: null, toppings: [] };

export const orderItemsReducer = (state = orderItemsInitialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return { ...state, bun: { ...action.item } };
    }
    case ADD_TOPPING: {
      return { ...state, toppings: [...state.toppings, action.item] };
    }
    case DELETE_TOPPING: {
      return { ...state, toppings: [...state.toppings.filter((el, i) => i !== action.index)] };
    }
    case UPDATE_TOPPINGS_LIST: {
      return { ...state, toppings: [...action.list] };
    }
    case CLEAR_ORDER_ITEMS: {
      return orderItemsInitialState;
    }
    default:
      return state;
  }
};

const orderDetailsInitialState = { visible: false, loading: false, error: null, currentOrder: {} };

export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
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
    case CLOSE_ORDER_DETAILS: {
      return orderDetailsInitialState;
    }
    default:
      return state;
  }
};
