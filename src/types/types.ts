export type TOrder = {
  ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: 'created' | 'pending' | 'done';
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
  readonly name: string;
};

export type TOrdersList = ReadonlyArray<TOrder>;

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

export type TTopping = TIngredient & { uuid: string };

export type TPageParams = {
  id: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserRegister = {
  email: string;
  password: string;
  name: string;
};

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUpdateUserInfo = {
  email?: string;
  password?: string;
  name?: string;
};

export type TUser = {
  email: string;
  name: string;
};
