import React from 'react';
// import cn from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { OrderContext } from '../../sevices/orderContext';
import normaApi from '../../sevices/normaApi.js';
// import data from '../../utils/data.js';

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

  const orderItems = state.ingridients.filter((i) => i.price < 2000 && i.type !== 'bun');
  const fixedItem = state.ingridients[0];

  return (
    <main className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {state.isLoading && 'Загрузка...'}
          {state.hasError && 'Произошла ошибка'}
          {!state.isLoading && !state.hasError && state.ingridients.length && (
            <OrderContext.Provider value={{ orderItems, fixedItem }}>
              <BurgerIngredients ingridients={state.ingridients} />
              <BurgerConstructor orderItems={orderItems} fixedItem={fixedItem} />
            </OrderContext.Provider>
          )}
        </div>
      </main>
    </main>
  );
}

export default App;
