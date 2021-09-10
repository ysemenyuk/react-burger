import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { getIngridients } from '../../services/actions/ingridientsActions';
// import data from '../../utils/data.js';

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ingridients);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  // useEffect(() => {
  //   setState((state) => ({ ...state, ingridients: data, isLoading: false }));
  // }, []);

  return (
    <main className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {loading && 'Загрузка..'}
          {error && 'Произошла ошибка..'}
          {!loading && !error && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </div>
      </main>
    </main>
  );
}

export default App;
