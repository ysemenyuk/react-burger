import React from 'react';
// import cn from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import normaApi from '../../api/normaApi.js';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    ingridients: [],
  });

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

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {state.isLoading && 'Загрузка...'}
          {state.hasError && 'Произошла ошибка'}
          {!state.isLoading && !state.hasError && state.ingridients.length && (
            <>
              <BurgerIngredients ingridients={state.ingridients} />
              <BurgerConstructor data={state.ingridients} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
