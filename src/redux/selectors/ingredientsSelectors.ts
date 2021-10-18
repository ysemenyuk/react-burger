import { RootState } from '../../types/mainTypes';

export const items = (state: RootState) => state.burgerIngredients.items;
export const getItems = (state: RootState) => state.burgerIngredients;
export const ingredientDetails = (state: RootState) => state.burgerIngredients.itemDetails;
