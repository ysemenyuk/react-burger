import { combineReducers } from 'redux';

import { allOrdersReducer } from './allOrdersReducer';
import { userOrdersReducer } from './userOrdersReducer';

import { ingredientsReducer } from './ingredientsReducer.js';
import { userReducer } from './userReducer.js';
import { constructorReducer } from './constructorReducer.js';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  allOrders: allOrdersReducer,
  userOrders: userOrdersReducer,
});
