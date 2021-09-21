import cn from 'classnames';
import styles from './BurgerConstructor.module.css';

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
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
  closeOrderDetails,
} from '../../redux/actions/constructorActions';

import { INGRIDIENTS, ItemTypes } from '../../utils/constants';
import { calculateTotalPrice, getOrderItemsIds, swapItems } from '../../utils/helpers';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isAuth = useSelector((state) => state.userInfo.isAuth);
  const orderItems = useSelector((state) => state.orderItems);
  const { visible, loading, error, currentOrder } = useSelector((state) => state.orderDetails);

  const { bun, toppings } = orderItems;

  const orderItemsIds = useMemo(() => getOrderItemsIds(orderItems), [orderItems]);
  const orderTotalPrice = useMemo(() => calculateTotalPrice(orderItems), [orderItems]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: INGRIDIENTS,
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      item.type === ItemTypes.BUN ? dispatch(addBun(item)) : dispatch(addTopping(item));
    },
  });

  const handleCreateOrder = () => {
    isAuth
      ? dispatch(createOrder(orderItemsIds))
      : history.push({ pathname: `/login`, state: { from: location } });
  };

  const handleCloseModal = () => {
    dispatch(closeOrderDetails());
    dispatch(clearOrderItems());
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
    <section className={cn(styles.section, 'p-5')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          {error ? (
            <Message message={error} />
          ) : loading ? (
            <Loader height={'400px'} />
          ) : (
            <OrderDetails order={currentOrder} />
          )}
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
          <button className={cn(styles.clearBtn)} onClick={handleClearOrderItems}>
            Очистить
          </button>
        )}
      </div>

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
