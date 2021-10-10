import { combineReducers } from 'redux';

import { allOrdersReducer } from './allOrdersReducer';
import { userOrdersReducer } from './userOrdersReducer';

import { ingredientsReducer } from './ingredientsReducer';
import { constructorReducer } from './constructorReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  allOrders: allOrdersReducer,
  userOrders: userOrdersReducer,
});
