import React from 'react';
// import cn from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { OrderContext } from '../../context/order.context';
import normaApi from '../../sevices/norma.api.js';
import { orderReducer } from '../../redux/reducers/order.reducer';
// import data from '../../utils/data.js';

const orderInitialState = {
  bun: null,
  orderItems: [],
  totalPrice: 0,
  orderNumber: null,
};

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingridients: [],
  });

  // React.useEffect(() => {
  //   setState((state) => ({ ...state, ingridients: data, isLoading: false }));
  // }, []);

  React.useEffect(() => {
    function getIngredients() {
      setState((state) => ({ ...state, hasError: false, isLoading: true }));
      normaApi
        .getIngredients()
        .then(({ data }) =>
          setState((state) => ({ ...state, ingridients: data, isLoading: false }))
        )
        .catch((e) => {
          setState((state) => ({ ...state, hasError: true, isLoading: false }));
        });
    }
    getIngredients();
  }, []);

  const [orderState, dispatch] = React.useReducer(orderReducer, orderInitialState);

  return (
    <main className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {state.isLoading && 'Загрузка...'}
          {state.hasError && 'Произошла ошибка'}
          {!state.isLoading && !state.hasError && state.ingridients.length && (
            <OrderContext.Provider
              value={{ ingridients: state.ingridients, dispatch, orderState }}
            >
              <BurgerIngredients />
              <BurgerConstructor />
            </OrderContext.Provider>
          )}
        </div>
      </main>
    </main>
  );
}

export default App;
