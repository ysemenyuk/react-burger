import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../types/types';

const initState = {
  loading: false,
  success: false,
  error: null,
  items: [],
  itemDetails: null,
};

export const ingredientsReducer = (state = initState, action) => {
  switch (action.type) {
    case INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, success: false, error: null };
    }
    case INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        items: [...action.payload],
      };
    }
    case INGRIDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case SET_INGREDIENT_DETAILS: {
      return { ...state, itemDetails: action.payload };
    }
    case RESET_INGREDIENT_DETAILS: {
      return { ...state, itemDetails: null };
    }
    default:
      return state;
  }
};
