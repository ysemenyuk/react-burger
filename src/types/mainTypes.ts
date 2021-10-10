import { Location } from 'history';

export type TLocation = { pathname?: string } & Location;

export type TOrder = {
  ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly status: 'created' | 'pending' | 'done';
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
  readonly name: string;
};

export type TPageParams = {
  id: string;
};
