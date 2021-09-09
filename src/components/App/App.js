import React from 'react';
// import cs from 'classnames';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngridients } from '../../services/actions/ingridientsActions';

// import data from '../../utils/data.js';

function App() {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((state) => state.ingridients);

  React.useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  // React.useEffect(() => {
  //   setState((state) => ({ ...state, ingridients: data, isLoading: false }));
  // }, []);

  return (
    <main className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {loading && 'Загрузка...'}
          {error && 'Произошла ошибка'}
          {!loading && !error && items.length && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients ingridients={items} />
              <BurgerConstructor />
            </DndProvider>
          )}
        </div>
      </main>
    </main>
  );
}

export default App;
