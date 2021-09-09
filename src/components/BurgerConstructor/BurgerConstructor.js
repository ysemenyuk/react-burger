import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ToppingCard from './ToppingCard/ToppingCard';
import BunCard from './BunCard/BunCard';

import {
  createOrder,
  closeOrderDetails,
  addBun,
  addTopping,
  updateToppingsList,
  deleteTopping,
} from '../../services/actions/constructorActions';

import { INGRIDIENTS, ItemTypes } from '../../utils/constants';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, toppings } = useSelector((state) => state.orderItems);
  const { visible, loading, currentOrder } = useSelector((state) => state.orderDetails);

  const orderItemsIds = useMemo(() => {
    const itemIds = toppings.map((item) => item._id);
    return [bun?._id, ...itemIds];
  }, [toppings, bun]);

  const orderTotalPrice = useMemo(() => {
    return [bun, bun, ...toppings].reduce((acc, item) => (item ? acc + item.price : acc), 0);
  }, [toppings, bun]);

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
    dispatch(createOrder(orderItemsIds));
  };

  const handleCloseModal = () => {
    dispatch(closeOrderDetails());
  };

  const handleDeleteCard = (index) => {
    dispatch(deleteTopping(index));
  };

  const handleMoveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = toppings[dragIndex];
      const updatedList = [...toppings];
      updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, dragCard);
      dispatch(updateToppingsList(updatedList));
    },
    [dispatch, toppings]
  );

  return (
    <section className={cn(styles.section, 'p-5', 'pt-25')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails loading={loading} order={currentOrder} />
        </Modal>
      )}

      {!bun && !toppings.length && <p>Перетащите ингридиенты в поле ниже</p>}
      {!bun && !!toppings.length && <p>Добавьте булку</p>}
      {bun && !toppings.length && <p>Добавьте ингридиенты</p>}
      {bun && !!toppings.length && <p>Можно оформлять</p>}

      <div
        ref={dropTarget}
        className={cn(styles.dropTarget, `${isHover && styles.dropTargetHover}`)}
      >
        {bun && <BunCard item={bun} top />}

        <ul className={cn(styles.itemsBox)}>
          {toppings.map((item, index) => (
            <ToppingCard
              key={index}
              item={item}
              index={index}
              handleMoveCard={handleMoveCard}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
        </ul>

        {bun && <BunCard item={bun} />}
      </div>

      <div className={cn(styles.total, 'm-4', 'mt-8', 'text_type_digits-medium')}>
        <span className={'mr-10'}>
          {orderTotalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button disabled={!bun} onClick={handleCreateOrder} type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
