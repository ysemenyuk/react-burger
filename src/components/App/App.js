import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';
import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { getIngridients } from '../../redux/actions/ingridientsActions';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';
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
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          {loading && <Loader height='300px' />}
          {error && <Message message='Network error' />}
          {!loading && !error && (
            <>
              <h1 className={cn('text', 'text_type_main-large', 'm-5', 'mt-10')}>
                Соберите бургер
              </h1>
              <div className={styles.constructor}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
