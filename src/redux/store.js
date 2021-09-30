import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { socketAllOrdersMiddleware } from './middleware/socketAllOrdersMiddleware.js';
import { socketUserOrdersMiddleware } from './middleware/socketUserOrdersMiddleware.js';
import { rootReducer } from './reducers/rootReducer.js';
import { wsAllOrdersActions, wsUserOrdersActions } from './types/types.js';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const middleware = [
  thunk,
  socketAllOrdersMiddleware(wsUrl, wsAllOrdersActions),
  socketUserOrdersMiddleware(wsUrl, wsUserOrdersActions),
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
