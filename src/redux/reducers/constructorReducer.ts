import * as types from '../constants/constants';
import { TConstructorActions, TConstructorState } from '../../types/constructorTypes';

const initState: TConstructorState = {
  bun: null,
  toppings: [],
  visible: false,
  loading: false,
  error: null,
  order: null,
};

export const constructorReducer = (
  state = initState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case types.ADD_BUN: {
      return { ...state, bun: { ...action.payload } };
    }
    case types.ADD_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings, { ...action.payload }],
      };
    }
    case types.DELETE_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings.filter((el) => el.uuid !== action.payload)],
      };
    }
    case types.UPDATE_TOPPINGS_LIST: {
      return { ...state, toppings: [...action.payload] };
    }
    case types.CLEAR_ORDER_ITEMS: {
      return { ...state, bun: null, toppings: [] };
    }
    case types.ORDER_REQUEST: {
      return { ...state, visible: false, loading: true, error: null };
    }
    case types.ORDER_SUCCESS: {
      return {
        ...state,
        visible: true,
        loading: false,
        error: null,
        order: action.payload,
      };
    }
    case types.ORDER_ERROR: {
      return { ...state, visible: true, loading: false, error: action.error };
    }
    case types.CLOSE_ORDER_CREATE_DETAILS: {
      return { ...state, visible: false, order: null };
    }
    default:
      return state;
  }
};
