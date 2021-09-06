import React from 'react';
// import PropTypes from 'prop-types';
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
// import ingridientPropTypes from '../../types/ingridientPropTypes.js';

import normaApi from '../../sevices/norma.api.js';

import { OrderContext } from '../../context/order.context';

function BurgerConstructor(props) {
  // const { orderItems, fixedItem } = props;
  const { dispatch, orderState } = React.useContext(OrderContext);
  const { bun, orderItems } = orderState;

  const orderItemsIds = React.useMemo(() => {
    const itemIds = orderItems.map((item) => item._id);
    return [bun?._id, ...itemIds];
  }, [orderItems, bun]);

  const orderTotalPrice = React.useMemo(() => {
    return [bun, bun, ...orderItems].reduce((acc, item) => (item ? acc + item.price : acc), 0);
  }, [orderItems, bun]);

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
        setState((state) => ({ ...state, response: res, isLoading: false }));
        setVisible(true);
      })
      .catch((e) => {
        setState((state) => ({ ...state, hasError: true, isLoading: false }));
      });
  };

  function handleCloseModal() {
    setVisible(false);
  }

  function handleDeleteItem(index) {
    dispatch({ type: 'DELETE_ITEM', payload: index });
  }

  return (
    <section className={cn(styles.section, 'p-5', 'pt-25')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderNumber={state.response.order.number} />
        </Modal>
      )}

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

      {!!orderItems.length && (
        <ul className={cn(styles.itemsBox)}>
          {orderItems.map((item, index) => (
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
      )}

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

      {bun || !!orderItems.length ? (
        <div className={cn(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}>
          <span className={'mr-10'}>
            {orderTotalPrice}
            <CurrencyIcon type='primary' />
          </span>
          <Button
            disabled={state.isLoading || !bun}
            onClick={handleCreateOrder}
            type='primary'
            size='large'
          >
            {state.isLoading ? 'Оформляем...' : 'Оформить заказ'}
          </Button>
        </div>
      ) : (
        <p>Выбирете ингридиенты</p>
      )}
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   orderItems: PropTypes.arrayOf(ingridientPropTypes).isRequired,
//   fixedItem: ingridientPropTypes.isRequired,
// };

export default BurgerConstructor;
