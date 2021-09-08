import { ADD_ITEM, DELETE_ITEM } from '../actions/constructor.actions';

export const orderReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      }
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload],
      };
    }
    case DELETE_ITEM: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: null,
        };
      }
      return {
        ...state,
        orderItems: state.orderItems.filter((item, index) => index !== action.payload),
      };
    }
    default:
      return state;
  }
};
