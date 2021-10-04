import * as types from '../types/types';

const initState = {
  loading: false,
  success: false,
  error: null,
  items: [],
  itemDetails: null,
};

export const ingredientsReducer = (state = initState, action) => {
  switch (action.type) {
    case types.INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, success: false, error: null };
    }
    case types.INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        items: [...action.payload],
      };
    }
    case types.INGRIDIENTS_ERROR: {
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
