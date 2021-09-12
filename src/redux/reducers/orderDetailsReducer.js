import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR, CLOSE_ORDER_DETAILS } from '../actions/types';

const initialState = { visible: false, loading: false, error: null, currentOrder: {} };

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return { ...state, loading: true, visible: true, error: null };
    }
    case ORDER_SUCCESS: {
      return { ...state, loading: false, error: null, currentOrder: { ...action.data } };
    }
    case ORDER_ERROR: {
      return { ...state, loading: false, error: action.error };
    }
    case CLOSE_ORDER_DETAILS: {
      return initialState;
    }
    default:
      return state;
  }
};
