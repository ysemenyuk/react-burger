import React from 'react';
// import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  Tab,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';

function TabItem(props) {
  return (
    <div className={cs(styles.item, 'mt-4', 'mb-4')}>
      <Counter count={1} size='default' />
      <img src={props.item.image} alt={props.item.name}></img>
      <span className={cs(styles.price, 'text_type_digits-default', 'mb-2')}>
        {props.item.price}
        <CurrencyIcon type='primary' />
      </span>
      <span className={cs(styles.name, 'text_type_main-default', 'mb-2')}>{props.item.name}</span>
    </div>
  );
}

function BurgerConstructor(props) {
  const mainTitleClass = cs('text', 'text_type_main-large', 'mt-5', 'mb-5')
  const secondTitleClass = cs('text', 'text_type_main-medium', 'mb-2')
  const groupConteinerClass = cs(styles.groupContainer, 'mb-10')

  return (
    <section className={cs(styles.section, 'p-5')}>
      <h1 className={mainTitleClass}>Соберите бургер</h1>

      <div className={cs(styles.tabs, 'mb-10')}>
        <Tab value='one' active={true}>
          Булки
        </Tab>
        <Tab value='two'>Соусы</Tab>
        <Tab value='three'>Начинки</Tab>
      </div>

      <div className={styles.itemsContainer}>

        <h2 className={secondTitleClass}>Булки</h2>
        <div className={groupConteinerClass}>
          {props.data
            .filter((item) => item.type === 'bun')
            .map((item) => (
              <TabItem item={item} />
            ))}
        </div>

        <h2 className={secondTitleClass}>Соусы</h2>
        <div className={groupConteinerClass}>
          {props.data
            .filter((item) => item.type === 'sauce')
            .map((item) => (
              <TabItem item={item} />
            ))}
        </div>

        <h2 className={secondTitleClass}>Начинки</h2>
        <div className={groupConteinerClass}>
          {props.data
            .filter((item) => item.type === 'main')
            .map((item) => (
              <TabItem item={item} />
            ))}
        </div>

      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
