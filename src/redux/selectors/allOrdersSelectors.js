export const orders = (state) => state.wsAllOrders.allOrders;

export const getAllOrders = (state) => state.wsAllOrders;

export const orderDetails = (state) => state.wsAllOrders.orderDetails;

const allOrdersSelectors = { orders, getAllOrders, orderDetails };

export default allOrdersSelectors;

// loading: false,
// success: false,
// error: null,
// connected: false,
// allOrders: [],
// ordersTotal: 0,
// ordersTotalToday: 0,
// orderDetails: {},
