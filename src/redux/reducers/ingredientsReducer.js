import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  RESET_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
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
    case SET_CURRENT_INGREDIENT: {
      return { ...state, itemDetails: action.payload };
    }
    case RESET_CURRENT_INGREDIENT: {
      return { ...state, itemDetails: null };
    }
    default:
      return state;
  }
};

// export const ingredientDetailsReducer = (
//   state = { isModalOpen: false, currentIngredient: null },
//   action
// ) => {
//   switch (action.type) {
//     case SET_CURRENT_INGREDIENT: {
//       return { isModalOpen: true, currentIngredient: action.payload };
//     }
//     case RESET_CURRENT_INGREDIENT: {
//       return { isModalOpen: false, currentIngridient: null };
//     }
//     default:
//       return state;
//   }
// };
