import { ingredientsSelectors } from '../redux/selectors';
import { TIngredient } from '../types/ingredientsTypes';
import { TOrder } from '../types/ordersTypes';
import { useAppSelector } from './useRedux';

type TIngredientMap = {
  [name: string]: TIngredient;
};

type TOrderIngredientMap = {
  [name: string]: TIngredient & { qnty: number };
};

const useOrderDetails = (order: TOrder) => {
  const orderIngredientsIds = order.ingredients.filter((id) => id);
  const allIngredients = useAppSelector(ingredientsSelectors.items);

  const allIngredientsMap: TIngredientMap = allIngredients.reduce(
    (map: TIngredientMap, item: TIngredient) => ({ ...map, [item._id]: item }),
    {}
  );

  const orderIngredientsMap: TOrderIngredientMap = orderIngredientsIds
    .map((id) => allIngredientsMap[id])
    .reduce((map: TOrderIngredientMap, item: TIngredient) => {
      map[item._id] ? (map[item._id].qnty += 1) : (map[item._id] = { ...item, qnty: 1 });
      return map;
    }, {});

  const orderIngredients: Array<TIngredient & { qnty: number }> =
    Object.values(orderIngredientsMap);

  const orderPrice: number = orderIngredientsIds.reduce(
    (sum: number, id: string) => (sum += allIngredientsMap[id].price),
    0
  );

  return {
    orderIngredients,
    orderPrice,
  };
};

export default useOrderDetails;
