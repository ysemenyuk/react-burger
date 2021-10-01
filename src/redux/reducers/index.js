import { combineReducers } from 'redux';

import { wsAllOrdersReducer } from './wsAllOrdersReducer';
import { wsUserOrdersReducer } from './wsUserOrdersReducer';

import { ingredientsReducer } from './ingredientsReducer.js';
import { userReducer } from './userReducer.js';
import { constructorReducer } from './constructorReducer.js';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUserOrders: wsUserOrdersReducer,
});
