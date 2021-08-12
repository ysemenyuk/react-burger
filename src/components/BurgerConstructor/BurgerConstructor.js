import React from 'react';
// import PropTypes from 'prop-types';
import {
  Tab,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';

function TabItem(props) {
  return (
    <div className={styles.item}>
      <Counter count={1} size='default' />
      <img src={props.item.image} alt={props.item.name}></img>
      <div className={styles.price}>
        <span>{props.item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <div className={styles.name}>{props.item.name}</div>
    </div>
  );
}

function BurgerConstructor(props) {
  return (
    <section className={styles.section}>
      <h1>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value='one' active={true}>
          Булки
        </Tab>
        <Tab value='two'>Соусы</Tab>
        <Tab value='three'>Начинки</Tab>
      </div>

      <div className={styles.tabContainer}>
        <h2>Булки</h2>
        {props.data
          .filter((item) => item.type === 'bun')
          .map((item) => (
            <TabItem item={item} />
          ))}
        <h2>Соусы</h2>
        {props.data
          .filter((item) => item.type === 'sauce')
          .map((item) => (
            <TabItem item={item} />
          ))}
        <h2>Начинки</h2>
        {props.data
          .filter((item) => item.type === 'main')
          .map((item) => (
            <TabItem item={item} />
          ))}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
