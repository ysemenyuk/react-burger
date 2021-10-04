import { useSelector } from 'react-redux';
import ingredientsSelectors from '../redux/selectors/ingredientsSelectors';

function useOrderDetails(order) {
  // const { ingredients } = order;
  const ingredients = order.ingredients.filter((id) => id);

  const allIngredients = useSelector(ingredientsSelectors.items);

  const allIngredientsMap = allIngredients.reduce(
    (map, item) => ({ ...map, [item._id]: item }),
    {}
  );

  const orderIngredientsMap = ingredients
    .map((id) => allIngredientsMap[id])
    .reduce((acc, item) => {
      acc[item._id] ? (acc[item._id].qnty += 1) : (acc[item._id] = { ...item, qnty: 1 });
      return acc;
    }, {});

  const orderIngredients = Object.values(orderIngredientsMap);
  const orderPrice = ingredients.reduce((sum, id) => (sum += allIngredientsMap[id].price), 0);

  return {
    orderIngredients,
    orderPrice,
  };
}

export default useOrderDetails;
