import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  success: false,
  error: null,
  items: [],
  ingredientsByType: {},
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, success: false, error: null };
    }
    case INGRIDIENTS_SUCCESS: {
      return {
        loading: false,
        success: true,
        error: null,
        items: [...action.items],
      };
    }
    case INGRIDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
};

export const ingredientDetailsReducer = (
  state = { isModalOpen: false, currentIngredient: {} },
  action
) => {
  switch (action.type) {
    case 'SET_CURRENT_INGREDIENT': {
      return { isModalOpen: true, currentIngredient: action.payload };
    }
    case 'RESET_CURRENT_INGREDIENT': {
      return { isModalOpen: false, currentIngridient: {} };
    }
    default:
      return state;
  }
};
