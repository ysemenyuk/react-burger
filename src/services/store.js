import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { ingridientsReducer, ingridientDetailsReducer } from './reducers/ingridientsReducer.js';

import { orderItemsReducer, orderDetailsReducer } from './reducers/constructorReducer.js';

const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  ingridientDetails: ingridientDetailsReducer,
  orderItems: orderItemsReducer,
  orderDetails: orderDetailsReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
