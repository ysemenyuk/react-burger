import * as types from '../constants/constants';
import { TIngredientsActions, TIngredientsState } from '../../types/ingredientsTypes';

const initState: TIngredientsState = {
  loading: false,
  success: false,
  error: null,
  items: [],
  itemDetails: null,
};

export const ingredientsReducer = (
  state = initState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case types.INGREDIENTS_REQUEST: {
      return { ...state, loading: true, success: false, error: null };
    }
    case types.INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        items: [...action.payload],
      };
    }
    case types.INGREDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case types.SET_INGREDIENT_DETAILS: {
      return { ...state, itemDetails: action.payload };
    }
    case types.RESET_INGREDIENT_DETAILS: {
      return { ...state, itemDetails: null };
    }
    default:
      return state;
  }
};
