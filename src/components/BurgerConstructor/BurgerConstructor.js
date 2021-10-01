import cn from 'classnames';
import styles from './BurgerConstructor.module.css';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderCreateDetails from './OrderCreateDetails/OrderCreateDetails';
import ToppingCard from './ToppingCard/ToppingCard';
import BunCard from './BunCard/BunCard';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';

import {
  addBun,
  addTopping,
  deleteTopping,
  updateToppingsList,
  clearOrderItems,
  createOrder,
  closeCreateOrderDetails,
} from '../../redux/actions/constructorActions';

import userSelectors from '../../redux/selectors/userSelectors';
import constructorSelectors from '../../redux/selectors/constructorSelectors';

import { INGRIDIENTS, itemsTypes } from '../../utils/constants';
import { calculateTotalPrice, getOrderItemsIds, swapItems } from '../../utils/helpers';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isAuth = useSelector(userSelectors.isAuth);
  const orderItems = useSelector(constructorSelectors.orderItems);
  const { visible, loading, error, order } = useSelector(constructorSelectors.orderCreate);
  const { bun, toppings } = orderItems;

  const orderItemsIds = useMemo(() => getOrderItemsIds(orderItems), [orderItems]);
  const orderTotalPrice = useMemo(() => calculateTotalPrice(orderItems), [orderItems]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: INGRIDIENTS,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      item.type === itemsTypes.BUN ? dispatch(addBun(item)) : dispatch(addTopping(item));
    },
  });

  const handleCreateOrder = () => {
    isAuth
      ? dispatch(createOrder(orderItemsIds))
      : history.push({ pathname: `/login`, state: { from: location } });
  };

  const handleCloseModal = () => {
    dispatch(closeCreateOrderDetails());
    !error && dispatch(clearOrderItems());
  };

  const handleClearOrderItems = () => {
    dispatch(clearOrderItems());
  };

  const handleDeleteCard = (index) => {
    dispatch(deleteTopping(index));
  };

  const handleMoveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const updatedToppings = swapItems(dragIndex, hoverIndex, toppings);
      dispatch(updateToppingsList(updatedToppings));
    },
    [dispatch, toppings]
  );

  return (
    <section className={cn(styles.section)}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          {error ? <Message message={error.message} /> : <OrderCreateDetails order={order} />}
        </Modal>
      )}

      <div className={cn(styles.header)}>
        <p>
          {!bun && !toppings.length && 'Перетащите ингридиенты в поле ниже'}
          {!bun && !!toppings.length && 'Добавьте булку'}
          {bun && !toppings.length && 'Добавьте начинки'}
          {bun && !!toppings.length && 'Добавьте еще начинки или Оформите заказ'}
        </p>
        {(bun || !!toppings.length) && (
          <button
            disabled={loading}
            className={cn(styles.clearBtn)}
            onClick={handleClearOrderItems}
          >
            Очистить
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      <div
        ref={dropTarget}
        className={cn(styles.dropTarget, `${isHover && styles.dropTargetHover}`)}
      >
        {bun && <BunCard item={bun} top />}

        <ul className={cn(styles.itemsBox)}>
          {toppings.map((item, index) => (
            <ToppingCard
              key={item.uuid}
              item={item}
              index={index}
              handleMoveCard={handleMoveCard}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
        </ul>

        {bun && <BunCard item={bun} />}
      </div>

      <div className={cn(styles.total, 'text_type_digits-medium')}>
        <span className={'mr-10'}>
          {orderTotalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button
          disabled={!bun || !toppings.length || loading}
          onClick={handleCreateOrder}
          type='primary'
          size='large'
        >
          {loading ? 'Оформляем..' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
