import groupByType from '../../utils/groupByType';
import { INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS, INGRIDIENTS_ERROR } from '../actions/types';

const initialState = { loading: false, success: false, error: null, ingridientsByType: {} };

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGRIDIENTS_REQUEST: {
      return { ...state, loading: true, success: false, error: null };
    }
    case INGRIDIENTS_SUCCESS: {
      return {
        loading: false,
        success: true,
        error: null,
        ingridientsByType: groupByType(action.items),
      };
    }
    case INGRIDIENTS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    default:
      return state;
  }
};
