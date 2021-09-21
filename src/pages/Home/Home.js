/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import styles from './Home.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';

function Home() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loader height='300px' />}
      {error && <Message message={error.message} />}
      {success && (
        <>
          <h1 className={cn(styles.title, 'text', 'text_type_main-large')}>Соберите бургер</h1>
          <div className={styles.constructor}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
