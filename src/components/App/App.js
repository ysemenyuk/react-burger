import React from 'react';
// import cs from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerIngredients/BurgerIngredients';
import BurgerIngredients from '../BurgerConstructor/BurgerConstructor';

// import data from '../../utils/data';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    function getData() {
      setState((state) => ({ ...state, hasError: false, isLoading: true }));
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((res) => res.json())
        .then((data) => setState((state) => ({ ...state, data: data.data, isLoading: false })))
        .catch((e) => {
          setState((state) => ({ ...state, hasError: true, isLoading: false }));
        });
    }
    getData();
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
              <BurgerConstructor data={state.data} />
              <BurgerIngredients data={state.data} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
