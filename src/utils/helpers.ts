import 'moment/locale/ru';
import moment from 'moment-timezone';
import { TIngredient } from '../types/ingredientsTypes';
import { TOrderItems, TTopping } from '../types/constructorTypes';

type TIngredientsByTypes = {
  [name: string]: Array<TIngredient>;
};

type TIngredientsWithQuantity = {
  [name: string]: number;
};

export const groupByType = (items: Array<TIngredient>): TIngredientsByTypes =>
  items.reduce((acc: TIngredientsByTypes, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

export const swapItems = (
  dragIndex: number,
  hoverIndex: number,
  list: Array<TTopping>
): Array<TTopping> => {
  const dragCard = list[dragIndex];
  const updatedList = [...list];
  updatedList.splice(dragIndex, 1);
  updatedList.splice(hoverIndex, 0, dragCard);
  return updatedList;
};

export const calculateQuantity = (orderItems: TOrderItems): TIngredientsWithQuantity => {
  const { bun, toppings } = orderItems;
  const allItems = bun ? [bun, bun, ...toppings] : toppings;
  return allItems.reduce((acc: TIngredientsWithQuantity, item) => {
    acc[item._id] ? (acc[item._id] += 1) : (acc[item._id] = 1);
    return acc;
  }, {});
};

export const getOrderItemsIds = (orderItems: TOrderItems): Array<string> => {
  const { bun, toppings } = orderItems;
  const itemsIds = toppings.map((item) => item._id);
  return bun ? [bun._id, ...itemsIds] : itemsIds;
};

export const calculateTotalPrice = (orderItems: TOrderItems): number => {
  const { bun, toppings } = orderItems;
  return [bun, bun, ...toppings].reduce((acc: number, item) => (item ? acc + item.price : acc), 0);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const removeRefreshToken = () => localStorage.removeItem('refreshToken');

export const setAccessToken = (token: string) => {
  const accessToken = token.split('Bearer ')[1];
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const removeAccessToken = () => localStorage.removeItem('accessToken');

// export const setAccessToken = (resp) => {
//   const accessToken = resp.accessToken.split('Bearer ')[1];
//   setCookie('accessToken', accessToken);
// };

// export const getAccessToken = () => getCookie('accessToken');

// export const removeAccessToken = () => setCookie('accessToken', null, { expires: -1 });

// export function setCookie(name, value, props) {
//   props = props || {};
//   let exp = props.expires;
//   if (typeof exp == 'number' && exp) {
//     const d = new Date();
//     d.setTime(d.getTime() + exp * 1000);
//     exp = props.expires = d;
//   }
//   if (exp && exp.toUTCString) {
//     props.expires = exp.toUTCString();
//   }
//   value = encodeURIComponent(value);
//   let updatedCookie = name + '=' + value;
//   for (const propName in props) {
//     updatedCookie += '; ' + propName;
//     const propValue = props[propName];
//     if (propValue !== true) {
//       updatedCookie += '=' + propValue;
//     }
//   }
//   document.cookie = updatedCookie;
// }

// export function getCookie(name) {
//   const matches = document.cookie.match(
//     new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

export const getOrderStatus = (status: string): string => {
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

export const getConstructorMessage = (bun: boolean, toppingLength: boolean): string => {
  if (!bun && !toppingLength) return 'Перетащите ингридиенты в поле ниже';
  if (!bun && !!toppingLength) return 'Добавьте булку';
  if (bun && !toppingLength) return 'Добавьте начинки';
  if (bun && !!toppingLength) return 'Добавьте еще начинки или Оформите заказ';
  return '';
};

export const getFormattedDate = (date: string) =>
  `${moment.tz(date, 'Europe/Moscow').calendar()} i-GMT+3`;
