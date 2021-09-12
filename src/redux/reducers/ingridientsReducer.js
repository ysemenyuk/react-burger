import groupByType from '../../utils/groupByType';
import { INGRIDIENTS_REQUEST, INGRIDIENTS_SUCCESS, INGRIDIENTS_ERROR } from '../actions/types';

const initialState = { loading: true, error: null, ingridientsByGroup: {} };

export const ingridientsReducer = (state = initialState, action) => {
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
