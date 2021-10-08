import 'moment/locale/ru';
import moment from 'moment-timezone';

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

export const setRefreshToken = (resp) => {
  const refreshToken = resp.refreshToken;
  localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const removeRefreshToken = () => localStorage.removeItem('refreshToken');

// export const setAccessToken = (resp) => {
//   const accessToken = resp.accessToken.split('Bearer ')[1];
//   localStorage.setItem('accessToken', accessToken);
// }

// export const getAccessToken = () => localStorage.getItem('accessToken');

// export const removeAccessToken = () => localStorage.removeItem('accessToken');

export const setAccessToken = (resp) => {
  const accessToken = resp.accessToken.split('Bearer ')[1];
  setCookie('accessToken', accessToken);
};

export const getAccessToken = () => getCookie('accessToken');

export const removeAccessToken = () => setCookie('accessToken', null, { expires: -1 });

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

export const getOrderStatus = (status) => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    default:
      return 'Статус неизвестен';
  }
};

export const getFormattedDate = (date) => `${moment.tz(date, 'Europe/Moscow').calendar()} i-GMT+3`;

export const createRequestReducer = (types) => {
  const initState = { loading: false, success: false, error: null };
  return (state = initState, action) => {
    switch (action.type) {
      case types.request:
        return { loading: true, success: false, error: null };
      case types.success:
        return { loading: false, success: true, error: null };
      case types.fail:
        return { loading: false, success: false, error: action.error };
      default:
        return state;
    }
  };
};
