import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'redux';

import { socketMiddleware } from './middleware/socketMiddleware.js';
import { rootReducer } from './reducers/index';
import { wsAllOrdersActions, wsUserOrdersActions } from './constants/constants';

import { TIngredientsActions } from '../types/ingredientsTypes';
import { TConstructorActions } from '../types/constructorTypes';
import { TUserActions } from '../types/userTypes';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const middleware = [
  thunk,
  socketMiddleware(wsUrl, wsAllOrdersActions),
  socketMiddleware(wsUrl, wsUserOrdersActions),
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof store.getState>;
export type TAppActions = TIngredientsActions | TConstructorActions | TUserActions;
export type AppDispatch = Dispatch<TAppActions>;

export default store;
