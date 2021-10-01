export const orders = (state) => state.wsUserOrders.userOrders;

export const getUserOrders = (state) => state.wsUserOrders;

// export const orderDetails = (state) => state.wsAllOrders.orderDetails;

const userOrdersSelectors = { orders, getUserOrders };

export default userOrdersSelectors;
