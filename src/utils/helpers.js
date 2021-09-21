export const groupByType = (items) =>
  items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

export const swapItems = (dragIndex, hoverIndex, list) => {
  const dragCard = list[dragIndex];
  const updatedList = [...list];
  updatedList.splice(dragIndex, 1);
  updatedList.splice(hoverIndex, 0, dragCard);
  return updatedList;
};

export const calculateQuantity = (orderItems) => {
  const { bun, toppings } = orderItems;
  return [bun, bun, ...toppings].reduce((acc, item) => {
    if (item) acc[item._id] ? (acc[item._id] += 1) : (acc[item._id] = 1);
    return acc;
  }, {});
};

export const getOrderItemsIds = (orderItems) => {
  const { bun, toppings } = orderItems;
  const itemIds = toppings.map((item) => item._id);
  return [bun?._id, ...itemIds];
};

export const calculateTotalPrice = (orderItems) => {
  const { bun, toppings } = orderItems;
  return [bun, bun, ...toppings].reduce((acc, item) => (item ? acc + item.price : acc), 0);
};

export const setRefreshToken = (resp) =>
  localStorage.setItem('refreshToken', resp.refreshToken);

export const setAccessToken = (resp) =>
  localStorage.setItem('accessToken', resp.accessToken.split(' ')[1]);

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const getAccessToken = () => localStorage.getItem('accessToken');

export const removeRefreshToken = () => localStorage.removeItem('refreshToken');

export const removeAccessToken = () => localStorage.removeItem('accessToken');
