import cn from 'classnames';
import styles from './OrderCard.module.css';

import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderCard({ item }) {
  const { name, number, createdAt, ingredients } = item;
  const allIngredients = useSelector((state) => state.ingredients.items);
  const orderIngredients = allIngredients.filter((item) => ingredients.includes(item._id));
  const totalPrice = orderIngredients.reduce((sum, item) => (sum += item.price), 0);

  const ingredientIcons = () => {
    const iconsForRender = orderIngredients.slice(0, 5);
    const restIcons = orderIngredients.slice(5);
    return (
      <>
        {iconsForRender.map((item, index) => (
          <li key={item._id} className={styles.ingredientIcon} style={{ zIndex: 10 - index }}>
            <img src={item.image_mobile} alt='ingredient' />
          </li>
        ))}
        {!!restIcons.length && (
          <li key={restIcons[0]._id} className={styles.ingredientIcon} style={{ zIndex: 0 }}>
            <img src={restIcons[0].image_mobile} alt='ingredient' style={{ opacity: 0.9 }} />
            <span className={cn(styles.text, 'text', 'text_type_digits-default')}>
              {`+${restIcons.length}`}
            </span>
          </li>
        )}
      </>
    );
  };

  return (
    <li className={cn(styles.itemCard)}>
      <header className={styles.header}>
        <span className={cn(styles.orderId, 'text', 'text_type_digits-default')}>
          {`#${number}`}
        </span>
        <span className={cn(styles.timestamp, 'text', 'text_color_inactive')}>
          {createdAt}
        </span>
      </header>

      <span className={cn(styles.name, 'text', 'text_type_main-medium')}>{name}</span>

      <div className={styles.orderInfo}>
        <ul className={styles.ingredients}>{ingredientIcons()}</ul>
        <span className={cn(styles.price, 'text', 'text_type_digits-medium')}>
          {totalPrice} <CurrencyIcon type='primary' />
        </span>
      </div>
    </li>
  );
}

export default OrderCard;
