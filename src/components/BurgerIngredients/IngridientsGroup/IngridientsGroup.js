import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngridientsGroup.module.css';
import ingridientPropTypes from '../../../types/ingridientPropTypes.js';

function IngridientsGroup({ ingridients, anchor, title, handleOpenModal }) {
  const titleClass = cn('text', 'text_type_main-medium', 'mb-2');
  const ingridientsGroupClass = cn(styles.ingridientsGroup, 'mb-10');

  // const ingridientsGroup = React.useMemo(
  //   () => ingridients.filter((item) => item.type === type),
  //   [ingridients, type]
  // );

  return (
    <div id={anchor}>
      <h2 className={titleClass}>{title}</h2>
      <ul className={ingridientsGroupClass}>
        {ingridients.map((item) => (
          <li
            key={item._id}
            className={cn(styles.itemCard, 'm-4', 'mr-2')}
            onClick={handleOpenModal(item)}
          >
            <Counter count={8} size='default' />
            <img src={item.image} alt={item.name} className={cn('mr-4', 'ml-4', 'mb-2')}></img>
            <span className={cn(styles.price, 'text_type_digits-default', 'mb-2')}>
              {item.price}
              <CurrencyIcon type='primary' />
            </span>
            <span className={cn(styles.name, 'text_type_main-default')}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

IngridientsGroup.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired,
  title: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

export default IngridientsGroup;
