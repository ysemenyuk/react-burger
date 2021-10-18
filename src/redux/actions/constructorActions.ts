import normaService from '../../services/normaService';
import { AppThunk } from '../../types/thunkTypes';
import { AppDispatch } from '../../types/mainTypes';
import * as types from '../constants/constants';
import {
  TAddBun,
  TAddTopping,
  TClearOrderItems,
  TCloseCreateOrderDetails,
  TTopping,
} from '../../types/constructorTypes';
import { TIngredient } from '../../types/ingredientsTypes';

export const addBun = (item: TIngredient): TAddBun => ({
  type: types.ADD_BUN,
  payload: item,
});

export const addTopping = (item: TTopping): TAddTopping => ({
  type: types.ADD_TOPPING,
  payload: item,
});

export const deleteTopping = (uuid: string) => ({
  type: types.DELETE_TOPPING,
  payload: uuid,
});

export const updateToppingsList = (list: Array<TTopping>) => ({
  type: types.UPDATE_TOPPINGS_LIST,
  payload: list,
});

export const clearOrderItems = (): TClearOrderItems => ({
  type: types.CLEAR_ORDER_ITEMS,
});

export const closeCreateOrderDetails = (): TCloseCreateOrderDetails => ({
  type: types.CLOSE_ORDER_CREATE_DETAILS,
});

export const createOrder: AppThunk =
  (itemsIds: Array<string>) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: types.ORDER_REQUEST });
      const { order } = await normaService.createOrder(itemsIds);
      dispatch({ type: types.ORDER_SUCCESS, payload: order });
    } catch (err) {
      dispatch({ type: types.ORDER_ERROR, error: { message: 'Network error' } });
    }
  };
