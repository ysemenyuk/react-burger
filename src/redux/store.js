import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { ingridientsReducer } from './reducers/ingridientsReducer.js';
import { orderItemsReducer } from './reducers/orderItemsReducer.js';
import { orderDetailsReducer } from './reducers/orderDetailsReducer.js';
import { userReducer, userLoginReducer, userRegisterReducer } from './reducers/userReducer.js';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  orderItems: orderItemsReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
