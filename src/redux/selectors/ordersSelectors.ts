import { RootState } from '../../types/mainTypes';

export const wsAllOrders = (state: RootState) => state.orders.allOrders;
export const wsUserOrders = (state: RootState) => state.orders.userOrders;
export const orderDetails = (state: RootState) => state.orders.orederDetails.order;
