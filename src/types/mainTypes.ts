import { Location } from 'history';

import { TIngredientsActions } from '../types/ingredientsTypes';
import { TConstructorActions } from '../types/constructorTypes';
import { TUserActions } from '../types/userTypes';
import { TOrdersActions } from '../types/ordersTypes';
import store from '../redux/store';

export type TLocation = { pathname?: string } & Location;

export type TPageParams = { id: string };

export type RootState = ReturnType<typeof store.getState>;

export type TAppActions =
  | TIngredientsActions
  | TConstructorActions
  | TUserActions
  | TOrdersActions;

export type AppDispatch = typeof store.dispatch;
