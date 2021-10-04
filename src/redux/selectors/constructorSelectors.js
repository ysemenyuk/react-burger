export const orderItems = (state) => ({
  bun: state.burgerConstructor.bun,
  toppings: state.burgerConstructor.toppings,
});

export const orderCreate = (state) => state.burgerConstructor;

const constructorSelectors = { orderItems, orderCreate };

export default constructorSelectors;
