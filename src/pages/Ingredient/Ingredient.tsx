/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Ingredient.module.css';
import cn from 'classnames';

import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useParams } from 'react-router-dom';

import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import { ingredientsSelectors } from '../../redux/selectors';
import { TPageParams } from '../../types/mainTypes';
import { TIngredient } from '../../types/ingredientsTypes';

const Ingredient: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<TPageParams>();

  const { loading, success, error } = useAppSelector(ingredientsSelectors.getItems);
  const items = useAppSelector(ingredientsSelectors.items);
  const currentItem = items.find((item: TIngredient) => item._id === id);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loader height='300px' />}
      {error && <Message message={error.message} />}
      {success && currentItem && (
        <>
          <h2 className={cn(styles.title, 'text', 'text_type_main-large')}>Детали ингредиента</h2>
          <IngredientDetails ingredient={currentItem} />
        </>
      )}
    </div>
  );
};

export default Ingredient;
