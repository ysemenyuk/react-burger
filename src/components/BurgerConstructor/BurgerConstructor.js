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

function BurgerConstructor(props) {
  const loackedElement = props.data[0];

  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  function handleCloseModal() {
    setVisible(false);
  }

  return (
    <section className={cn(styles.section, 'p-5', 'pt-25')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}

      <div className={cn(styles.item, 'm-4')}>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${loackedElement.name} (верх)`}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <ul className={cn(styles.itemsBox)}>
        {props.data.map((item, id) => (
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
          text={`${loackedElement.name} (низ)`}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <div className={cn(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}>
        <span className={'mr-10'}>
          8610
          <CurrencyIcon type='primary' />
        </span>
        <Button onClick={handleOpenModal} type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};

export default BurgerConstructor;
