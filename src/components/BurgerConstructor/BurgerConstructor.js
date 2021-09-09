import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import styles from './BurgerConstructor.module.css';
import {
  createOrder,
  closeOrderDetails,
  addBun,
  addTopping,
} from '../../services/actions/constructorActions';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, toppings } = useSelector((state) => state.orderItems);
  const { visible, loading, currentOrder } = useSelector((state) => state.orderDetails);

  const orderItemsIds = React.useMemo(() => {
    const itemIds = toppings.map((item) => item._id);
    return [bun?._id, ...itemIds];
  }, [toppings, bun]);

  const orderTotalPrice = React.useMemo(() => {
    return [bun, bun, ...toppings].reduce((acc, item) => (item ? acc + item.price : acc), 0);
  }, [toppings, bun]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'items',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      item.type === 'bun' ? dispatch(addBun(item)) : dispatch(addTopping(item));
    },
  });

  const handleCreateOrder = () => {
    dispatch(createOrder(orderItemsIds));
  };

  function handleCloseModal() {
    dispatch(closeOrderDetails());
  }

  function handleDeleteItem(index) {
    dispatch({ type: 'DELETE_ITEM', payload: index });
  }

  return (
    <section className={cn(styles.section, 'p-5', 'pt-25')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails loading={loading} order={currentOrder} />
        </Modal>
      )}

      {(!bun || !toppings.length) && <p>Выбирете ингридиенты</p>}

      {bun && (
        <div className={cn(styles.item, 'm-4')}>
          <ConstructorElement
            type={'top'}
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <ul ref={dropTarget} className={cn(styles.itemsBox, `${isHover && styles.itemsBoxHover}`)}>
        {toppings.map((item, index) => (
          <li key={index} className={cn(styles.item, 'mb-4', 'ml-4', 'mr-4')}>
            <DragIcon type='primary' />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => handleDeleteItem(index)}
            />
          </li>
        ))}
      </ul>

      {bun && (
        <div className={cn(styles.item, 'm-4')}>
          <ConstructorElement
            type={'bottom'}
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      {(bun || !!toppings.length) && (
        <div className={cn(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}>
          <span className={'mr-10'}>
            {orderTotalPrice}
            <CurrencyIcon type='primary' />
          </span>
          <Button disabled={!bun} onClick={handleCreateOrder} type='primary' size='large'>
            'Оформить заказ'
          </Button>
        </div>
      )}
    </section>
  );
}

export default BurgerConstructor;
