import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import itemDataPropTypes from '../itemDataPropTypes.js';

function BurgerConstructor(props) {
  const loackedElement = props.data[0];

  return (
    <section className={cs(styles.section, 'p-5', 'pt-25')}>
      <div className={cs(styles.item, 'm-4')}>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${loackedElement.name} (верх)`}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <ul className={cs(styles.itemsBox, 'mb-4')}>
        {props.data.map((item, id) => (
          <li key={id} className={cs(styles.item, 'mb-4', 'ml-4', 'mr-2')}>
            <DragIcon type='primary' />
            <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
          </li>
        ))}
      </ul>

      <div className={cs(styles.item, 'm-4')}>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${loackedElement.name} (низ)`}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <div className={cs(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}>
        <span className={'mr-10'}>
          8610
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
};

export default BurgerConstructor;
