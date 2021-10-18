import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { socketMiddleware } from './middleware/socketMiddleware';
import { rootReducer } from './reducers/index';
import { wsAllOrdersActions, wsUserOrdersActions } from './constants/constants';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const middleware = [
  thunk,
  socketMiddleware(wsUrl, wsAllOrdersActions, false),
  socketMiddleware(wsUrl, wsUserOrdersActions, true),
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
