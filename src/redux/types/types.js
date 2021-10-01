// ingredients
export const INGRIDIENTS_REQUEST = 'INGRIDIENTS_REQUEST';
export const INGRIDIENTS_SUCCESS = 'INGRIDIENTS_SUCCESS';
export const INGRIDIENTS_ERROR = 'INGRIDIENTS_ERROR';

// currentIngredient
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';

// orderItems
export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const DELETE_TOPPING = 'DELETE_TOPPING';
export const UPDATE_TOPPINGS_LIST = 'UPDATE_TOPPINGS_LIST';
export const CLEAR_ORDER_ITEMS = 'CLEAR_ORDER_ITEMS';

// OrderDetails
export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

// user
export const USER_CHECK_AUTH_REQUEST = 'USER_CHECK_AUTH_REQUEST';
export const USER_CHECK_AUTH_SUCCESS = 'USER_CHECK_AUTH_SUCCESS';
export const USER_CHECK_AUTH_FAIL = 'USER_CHECK_AUTH_FAIL';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAIL = 'USER_LOGOUT_FAIL';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAIL = 'USER_PROFILE_FAIL';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL';

export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS';
export const USER_FORGOT_PASSWORD_FAIL = 'USER_FORGOT_PASSWORD_FAIL';

export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
export const USER_RESET_PASSWORD_FAIL = 'USER_RESET_PASSWORD_FAIL';

// ws all orders
export const WS_ALL_ORDERS_CONNECTION_START = 'WS_ALL_ORDERS_CONNECTION_START';
export const WS_ALL_ORDERS_CONNECTION_SUCCESS = 'WS_ALL_ORDERS_CONNECTION_SUCCESS';
export const WS_ALL_ORDERS_CONNECTION_ERROR = 'WS_ALL_ORDERS_CONNECTION_ERROR';
export const WS_ALL_ORDERS_CONNECTION_CLOSED = 'WS_ALL_ORDERS_CONNECTION_CLOSED';

export const WS_GET_ALL_ORDERS = 'WS_GET_ALL_ORDERS';

export const WS_SHOW_ORDERS_DETAILS = 'WS_SHOW_ORDERS_DETAILS';
export const WS_CLEAR_ORDERS_DETAILS = 'WS_CLEAR_ORDERS_DETAILS';

export const ALL_ORDERS_REQUEST = 'ALL_ORDERS__REQUEST';
export const ALL_ORDERS_SUCCESS = 'ALL_ORDERS__SUCCESS';
export const ALL_ORDERS_ERROR = 'ALL_ORDERS__ERROR';

// ws user orders
export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED';

export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

export const USER_ORDERS__REQUEST = 'ALL_ORDERS__REQUEST';
export const USER_ORDERS__SUCCESS = 'ALL_ORDERS__SUCCESS';
export const USER_ORDERS__ERROR = 'ALL_ORDERS__ERROR';

export const wsAllOrdersActions = {
  wsAllOrdersInit: WS_ALL_ORDERS_CONNECTION_START,
  onOpenAllOrders: WS_ALL_ORDERS_CONNECTION_SUCCESS,
  onErrorAllOrders: WS_ALL_ORDERS_CONNECTION_ERROR,
  onCloseAllOrders: WS_ALL_ORDERS_CONNECTION_CLOSED,
  getAllOrders: WS_GET_ALL_ORDERS,
};

export const wsUserOrdersActions = {
  wsUserOrdersInit: WS_USER_ORDERS_CONNECTION_START,
  onOpenUserOrders: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onErrorUserOrders: WS_USER_ORDERS_CONNECTION_ERROR,
  onCloseUserOrders: WS_USER_ORDERS_CONNECTION_CLOSED,
  getUserOrders: WS_GET_USER_ORDERS,
};
