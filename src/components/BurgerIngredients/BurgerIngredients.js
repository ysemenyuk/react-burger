import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ItemsGroup from './ItemsGroup/ItemsGroup';

import styles from './BurgerIngredients.module.css';
import itemDataPropTypes from '../itemDataPropTypes.js';

function BurgerIngredients(props) {
  const mainTitleClass = cs('text', 'text_type_main-large', 'mt-5', 'mb-5');

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

      <div className={styles.itemsBox}>
        <ItemsGroup data={props.data} type={'bun'} />
        {/* <ItemsGroup data={props.data} type={'sauce'} /> */}
        {/* <ItemsGroup data={props.data} type={'main'} /> */}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
};

export default BurgerIngredients;
