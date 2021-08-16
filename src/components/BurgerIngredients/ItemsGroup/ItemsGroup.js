import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ItemsGroup.module.css';
import itemDataPropTypes from '../../itemDataPropTypes.js';

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
      <ul className={itemsGroupClass}>
        {props.data
          .filter((item) => item.type === props.type)
          .map((item) => (
            <li key={item._id} className={cs(styles.itemCard, 'm-4', 'mr-2')}>
              <Counter count={1} size='default' />
              <img src={item.image} alt={item.name}></img>
              <span className={cs(styles.price, 'text_type_digits-default', 'mb-2')}>
                {item.price}
                <CurrencyIcon type='primary' />
              </span>
              <span className={cs(styles.name, 'text_type_main-default')}>{item.name}</span>
            </li>
          ))}
      </ul>
    </>
  );
}

ItemsGroup.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
  type: PropTypes.string,
};

export default ItemsGroup;
