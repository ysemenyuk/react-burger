import groupByType from '../../utils/groupByType';
import {
  INGRIDIENTS_REQUEST,
  INGRIDIENTS_SUCCESS,
  INGRIDIENTS_ERROR,
  SET_CURRENT_ITEM,
  RESET_CURRENT_ITEM,
} from '../actions/types';

const ingridientsInitialState = { loading: true, error: null, ingridientsByGroup: {} };

export const ingridientsReducer = (state = ingridientsInitialState, action) => {
  switch (action.type) {
    case INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case INGRIDIENTS_SUCCESS: {
      return { loading: false, error: null, ingridientsByGroup: groupByType(action.items) };
    }
    case INGRIDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
};

const ingridientDetailsInitialState = { visible: false, currentItem: {} };

export const ingridientDetailsReducer = (state = ingridientDetailsInitialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM: {
      return { visible: true, currentItem: { ...action.item } };
    }
    case RESET_CURRENT_ITEM: {
      return ingridientDetailsInitialState;
    }
    default:
      return state;
  }
};
