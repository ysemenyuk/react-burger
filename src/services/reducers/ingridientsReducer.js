import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  SET_CURRENT_ITEM,
  RESET_CURRENT_ITEM,
} from '../actions/types';

export const ingridientsReducer = (state = { loading: true, error: null, items: [] }, action) => {
  switch (action.type) {
    case INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case INGRIDIENTS_SUCCESS: {
      return { loading: false, error: null, items: [...action.items] };
    }
    case INGRIDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
};

export const ingridientDetailsReducer = (state = { visible: false, currentItem: {} }, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      return { visible: true, currentItem: { ...action.item } };
    }
    case RESET_CURRENT_ITEM: {
      return { visible: false, currentItem: {} };
    }
    default:
      return state;
  }
};
