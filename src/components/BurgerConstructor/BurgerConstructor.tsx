import cn from 'classnames';
import styles from './BurgerConstructor.module.css';
import { v4 as uuidv4 } from 'uuid';

import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderCreateDetails from '../OrderCreateDetails/OrderCreateDetails';
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

import { constructorSelectors, userSelectors } from '../../redux/selectors';
import { INGRIDIENTS, itemsTypes } from '../../utils/constants';
import {
  calculateTotalPrice,
  getConstructorMessage,
  getOrderItemsIds,
  swapItems,
} from '../../utils/helpers';
import { TTopping } from '../../types/constructorTypes';
import { TIngredient } from '../../types/ingredientsTypes';

const BurgerConstructor: FC = () => {
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
    drop(item: TIngredient) {
      item.type === itemsTypes.BUN
        ? dispatch(addBun(item))
        : dispatch(addTopping({ ...item, uuid: uuidv4() }));
    },
  });

  const handleCreateOrder = () => {
    if (!bun || !toppings.length || loading) return;
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

  const handleDeleteCard = (uuid: string) => {
    dispatch(deleteTopping(uuid));
  };

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedToppings = swapItems(dragIndex, hoverIndex, toppings);
      dispatch(updateToppingsList(updatedToppings));
    },
    [dispatch, toppings]
  );

  return (
    <section className={cn(styles.section)}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          {error ? (
            <Message message={error.message} />
          ) : (
            <OrderCreateDetails orderNumber={order.number} />
          )}
        </Modal>
      )}

      <div className={cn(styles.header)}>
        <p>{getConstructorMessage(!!bun, !!toppings.length)}</p>
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
          {toppings.map((item: TTopping, index: number) => (
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
        <Button onClick={handleCreateOrder} type='primary' size='large'>
          {loading ? 'Оформляем..' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
