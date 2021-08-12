import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  DeleteIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';

function Item(props) {
  return (
    <div className={styles.item}>
      <DragIcon type='primary' />
      <div className={styles.itemInfo}>
        <img src={props.item.image_mobile} alt={props.item.name}></img>
        <div className={styles.itemName}>{props.item.name}</div>
        <div className={styles.itemPrice}>
          <span>{props.item.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <DeleteIcon type='primary' />
      </div>
    </div>
  );
}

function BurgerIngredients(props) {
  return (
    <section className={styles.section}>
      <div className={styles.items}>
        {props.data.map((item) => (
          <Item item={item} />
        ))}
      </div>
      <div className={styles.total}>
        <div className={styles.totalPrice}>
          <span>5500</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='medium'>
          Нажми на меня
        </Button>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
