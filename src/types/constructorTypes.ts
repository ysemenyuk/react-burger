import * as types from '../redux/constants/constants';
import { TIngredient } from './ingredientsTypes';

export type TTopping = TIngredient & { uuid: string };

export type TCreatedOrder = {
  number: string;
  name: string;
};

export type TConstructorState = {
  bun: null | TIngredient;
  toppings: [] | Array<TTopping>;
  visible: boolean;
  loading: boolean;
  error: { message: string } | null;
  order: TCreatedOrder | null;
};

export type TAddBun = {
  type: typeof types.ADD_BUN;
  payload: TIngredient;
};

export type TAddTopping = {
  type: typeof types.ADD_TOPPING;
  payload: TTopping;
};

export type TDeleteTopping = {
  type: typeof types.DELETE_TOPPING;
  payload: string;
};

export type TUpdateToppingsList = {
  type: typeof types.UPDATE_TOPPINGS_LIST;
  payload: Array<TTopping>;
};

export type TClearOrderItems = {
  type: typeof types.CLEAR_ORDER_ITEMS;
};

export type TCloseCreateOrderDetails = {
  type: typeof types.CLOSE_ORDER_CREATE_DETAILS;
};

export type TCreateOrderRequest = {
  type: typeof types.ORDER_REQUEST;
};

export type TCreateOrderSuccess = {
  type: typeof types.ORDER_SUCCESS;
  payload: TCreatedOrder;
};

export type TCreateOrderError = {
  type: typeof types.ORDER_ERROR;
  error: { message: string };
};

export type TConstructorActions =
  | TAddBun
  | TAddTopping
  | TDeleteTopping
  | TUpdateToppingsList
  | TClearOrderItems
  | TCloseCreateOrderDetails
  | TCreateOrderRequest
  | TCreateOrderSuccess
  | TCreateOrderError;
