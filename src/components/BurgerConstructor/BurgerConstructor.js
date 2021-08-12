import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  Tab,
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';

const itemDataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
});

function BurgerConstructor(props) {
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
        <ItemsGroup data={props.data} type={'sauce'} />
        <ItemsGroup data={props.data} type={'main'} />
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
};

export default BurgerConstructor;

function ItemsGroup(props) {
  const titleClass = cs('text', 'text_type_main-medium', 'mb-2');
  const itemsGroupClass = cs(styles.itemsGroupBox, 'mb-10');

  const map = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const title = map[props.type];

  return (
    <>
      <h2 className={titleClass}>{title}</h2>
      <div className={itemsGroupClass}>
        {props.data
          .filter((item) => item.type === props.type)
          .map((data) => (
            <ItemCard key={data._id} item={data} />
          ))}
      </div>
    </>
  );
}

ItemsGroup.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
  type: PropTypes.string,
};

function ItemCard(props) {
  return (
    <div className={cs(styles.itemCard, 'm-4', 'mr-2')}>
      <Counter count={1} size='default' />
      <img src={props.item.image} alt={props.item.name}></img>
      <span className={cs(styles.price, 'text_type_digits-default', 'mb-2')}>
        {props.item.price}
        <CurrencyIcon type='primary' />
      </span>
      <span className={cs(styles.name, 'text_type_main-default')}>
        {props.item.name}
      </span>
    </div>
  );
}

ItemCard.propTypes = {
  item: itemDataPropTypes,
};
