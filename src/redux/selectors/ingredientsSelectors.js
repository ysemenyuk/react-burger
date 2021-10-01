export const items = (state) => state.burgerIngredients.items;

export const getItems = (state) => state.burgerIngredients;

export const ingredientDetails = (state) => state.burgerIngredients.itemDetails;

const ingredientsSelectors = { items, getItems, ingredientDetails };

export default ingredientsSelectors;
