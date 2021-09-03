import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import styles from './BurgerConstructor.module.css';
import ingridientPropTypes from '../../types/ingridientPropTypes.js';

import normaApi from '../../sevices/normaApi.js';

import { OrderContext } from '../../sevices/orderContext';

function BurgerConstructor(props) {
  // const { orderItems, fixedItem } = props;
  const { orderItems, fixedItem } = React.useContext(OrderContext);

  const orderItemsIds = orderItems.map((i) => i._id);
  const totalPrice = [fixedItem, fixedItem, ...orderItems].reduce((acc, i) => acc + i.price, 0);

  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    response: null,
  });

  const handleCreateOrder = () => {
    setState((state) => ({ ...state, hasError: false, isLoading: true }));
    normaApi
      .createOrder(orderItemsIds)
      .then((res) => {
        // console.log(1, res);
        setState((state) => ({ ...state, response: res, isLoading: false }));
        setVisible(true);
      })
      .catch((e) => {
        // console.log(2, e);
        setState((state) => ({ ...state, hasError: true, isLoading: false }));
      });
  };

  function handleCloseModal() {
    setVisible(false);
  }

  return (
    <section className={cn(styles.section, 'p-5', 'pt-25')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={state.response.order.number} />
        </Modal>
      )}

      <div className={cn(styles.item, 'm-4')}>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${fixedItem.name} (верх)`}
          price={fixedItem.price}
          thumbnail={fixedItem.image}
        />
      </div>

      <ul className={cn(styles.itemsBox)}>
        {orderItems.map((item, id) => (
          <li key={id} className={cn(styles.item, 'mb-4', 'ml-4', 'mr-2')}>
            <DragIcon type='primary' />
            <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
          </li>
        ))}
      </ul>

      <div className={cn(styles.item, 'm-4')}>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${fixedItem.name} (низ)`}
          price={fixedItem.price}
          thumbnail={fixedItem.image}
        />
      </div>

      <div className={cn(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}>
        <span className={'mr-10'}>
          {totalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button disabled={state.isLoading} onClick={handleCreateOrder} type='primary' size='large'>
          {state.isLoading ? 'Оформляем...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  orderItems: PropTypes.arrayOf(ingridientPropTypes).isRequired,
  fixedItem: ingridientPropTypes.isRequired,
};

export default BurgerConstructor;
