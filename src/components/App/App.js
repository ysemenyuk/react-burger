import React from 'react';
// import cn from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

// import data from '../../utils/data';
import { ingridientsRoute } from '../../api/routes.js';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    function getData(url) {
      setState((state) => ({ ...state, hasError: false, isLoading: true }));
      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => setState((state) => ({ ...state, data, isLoading: false })))
        .catch((e) => {
          setState((state) => ({ ...state, hasError: true, isLoading: false }));
        });
    }
    getData(ingridientsRoute);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {state.isLoading && 'Загрузка...'}
          {state.hasError && 'Произошла ошибка'}
          {!state.isLoading && !state.hasError && state.data.length && (
            <>
              <BurgerIngredients data={state.data} />
              <BurgerConstructor data={state.data} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
