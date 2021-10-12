import { RootState } from '../../types/mainTypes';

export const orderItems = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  toppings: state.burgerConstructor.toppings,
});

export const orderCreate = (state: RootState) => state.burgerConstructor;
