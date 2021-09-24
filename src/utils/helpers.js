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

export const setRefreshToken = (resp) => localStorage.setItem('refreshToken', resp.refreshToken);

export const getRefreshToken = () => localStorage.getItem('refreshToken');

// export const setAccessToken = (resp) =>
//   localStorage.setItem('accessToken', resp.accessToken.split(' ')[1]);

// export const getAccessToken = () => localStorage.getItem('accessToken');

export const setAccessToken = (resp) => {
  const accessToken = resp.accessToken.split('Bearer ')[1];
  setCookie('accessToken', accessToken);
};

export const getAccessToken = () => getCookie('accessToken');

export const removeRefreshToken = () => localStorage.removeItem('refreshToken');

export const removeAccessToken = () => localStorage.removeItem('accessToken');

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
