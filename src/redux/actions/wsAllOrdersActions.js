import normaService from '../../services/normaService';
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_SHOW_ORDERS_DETAILS,
  WS_CLEAR_ORDERS_DETAILS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_ERROR,
} from '../types/types';

export const wsAllOrdersConnectionStart = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionSuccess = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_SUCCESS };
};

export const wsAllOrdersConnectionError = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_ERROR };
};

export const wsAllOrdersConnectionClosed = () => {
  return { type: WS_ALL_ORDERS_CONNECTION_CLOSED };
};

export const showOrderDetails = (data) => ({
  type: WS_SHOW_ORDERS_DETAILS,
  payload: data,
});

export const clearOrderDetails = () => ({
  type: WS_CLEAR_ORDERS_DETAILS,
});

const allOrdersRequest = () => ({
  type: ALL_ORDERS_REQUEST,
});

const allOrdersSucces = (data) => ({
  type: ALL_ORDERS_SUCCESS,
  payload: data,
});

const allOrdersError = (error) => ({
  type: ALL_ORDERS_ERROR,
  error: error,
});

export const fetchAllOrders = () => async (dispatch) => {
  dispatch(allOrdersRequest());

  try {
    const response = await normaService.fetchAllOrders();
    dispatch(allOrdersSucces(response));
  } catch (error) {
    console.log(1, error);
    dispatch(allOrdersError(error));
  }
};
