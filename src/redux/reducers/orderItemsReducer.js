import { v4 as uuidv4 } from 'uuid';
import {
  ADD_BUN,
  ADD_TOPPING,
  DELETE_TOPPING,
  UPDATE_TOPPINGS_LIST,
  CLEAR_ORDER_ITEMS,
} from '../actions/types';

const initialState = { bun: null, toppings: [] };

export const orderItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return { ...state, bun: { ...action.item } };
    }
    case ADD_TOPPING: {
      return { ...state, toppings: [...state.toppings, { ...action.item, uuid: uuidv4() }] };
    }
    case DELETE_TOPPING: {
      return { ...state, toppings: [...state.toppings.filter((el, i) => i !== action.index)] };
    }
    case UPDATE_TOPPINGS_LIST: {
      return { ...state, toppings: [...action.list] };
    }
    case CLEAR_ORDER_ITEMS: {
      return initialState;
    }
    default:
      return state;
  }
};
