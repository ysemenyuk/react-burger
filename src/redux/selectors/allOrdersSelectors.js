export const allOrders = (state) => state.allOrders.allOrders;

export const wsAllOrders = (state) => state.allOrders;

export const orderDetails = (state) => state.allOrders.orderDetails;

const allOrdersSelectors = { allOrders, wsAllOrders, orderDetails };

export default allOrdersSelectors;
