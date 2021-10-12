import * as types from '../redux/constants/constants';

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: 'bun' | 'sauce' | 'main';
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientsState = {
  loading: boolean;
  success: boolean;
  error: { message: string } | null;
  items: Array<TIngredient>;
  itemDetails: TIngredient | null;
};

export type TIngredientsRequest = {
  type: typeof types.INGREDIENTS_REQUEST;
};

export type TIngredientsSuccess = {
  type: typeof types.INGREDIENTS_SUCCESS;
  payload: Array<TIngredient>;
};

export type TIngredientsError = {
  type: typeof types.INGREDIENTS_ERROR;
  error: { message: string };
};

export type TSetIngredientDetails = {
  type: typeof types.SET_INGREDIENT_DETAILS;
  payload: TIngredient;
};

export type TResetIngredientDetails = {
  type: typeof types.RESET_INGREDIENT_DETAILS;
};

export type TIngredientsActions =
  | TIngredientsRequest
  | TIngredientsSuccess
  | TIngredientsError
  | TSetIngredientDetails
  | TResetIngredientDetails;
