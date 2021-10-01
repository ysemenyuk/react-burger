import { v4 as uuidv4 } from 'uuid';

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
} from '../types/types';

const initState = {
  bun: null,
  toppings: [],
  visible: false,
  loading: false,
  error: null,
  order: {},
};

export const constructorReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return { ...state, bun: { ...action.payload } };
    }
    case ADD_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings, { ...action.payload, uuid: uuidv4() }],
      };
    }
    case DELETE_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings.filter((el) => el.uuid !== action.payload)],
      };
    }
    case UPDATE_TOPPINGS_LIST: {
      return { ...state, toppings: [...action.payload] };
    }
    case CLEAR_ORDER_ITEMS: {
      return { ...state, bun: null, toppings: [] };
    }
    case ORDER_REQUEST: {
      return { ...state, visible: false, loading: true, error: null };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        visible: true,
        loading: false,
        error: null,
        order: { ...action.payload },
      };
    }
    case ORDER_ERROR: {
      return { ...state, visible: true, loading: false, error: action.error };
    }
    case CLOSE_ORDER_DETAILS: {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};

// const orderInitState = { visible: false, loading: false, error: null, currentOrder: {} };

// export const orderDetailsReducer = (state = orderInitState, action) => {
//   switch (action.type) {
//     case ORDER_REQUEST: {
//       return { ...state, visible: false, loading: true, error: null };
//     }
//     case ORDER_SUCCESS: {
//       return {
//         ...state,
//         visible: true,
//         loading: false,
//         error: null,
//         currentOrder: { ...action.payload },
//       };
//     }
//     case ORDER_ERROR: {
//       return { ...state, visible: true, loading: false, error: action.error };
//     }
//     case CLOSE_ORDER_DETAILS: {
//       return { ...state, visible: false };
//     }
//     default:
//       return state;
//   }
// };
