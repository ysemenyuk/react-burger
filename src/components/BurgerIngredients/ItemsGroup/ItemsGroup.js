import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../Modal/Modal';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';

import styles from './ItemsGroup.module.css';
import itemDataPropTypes from '../../itemDataPropTypes.js';

function ItemsGroup(props) {
  const titleClass = cn('text', 'text_type_main-medium', 'mb-2');
  const itemsGroupClass = cn(styles.itemsGroupBox, 'mb-10');

  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const mapping = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const title = mapping[props.type];

  const handleOpenModal = (item) => () => {
    setVisible(true);
    setItem(item);
  };

  function handleCloseModal() {
    setVisible(false);
  }

  return (
    <>
      <Modal visible={visible} header='Детали ингредиента' onClose={handleCloseModal}>
        <IngredientDetails item={item} />
      </Modal>
      <h2 className={titleClass}>{title}</h2>
      <ul className={itemsGroupClass}>
        {props.data
          .filter((item) => item.type === props.type)
          .map((item) => (
            <li
              key={item._id}
              className={cn(styles.itemCard, 'm-4', 'mr-2')}
              onClick={handleOpenModal(item)}
            >
              <Counter count={1} size='default' />
              <img src={item.image} alt={item.name} className={cn('mr-4', 'ml-4', 'mb-2')}></img>
              <span className={cn(styles.price, 'text_type_digits-default', 'mb-2')}>
                {item.price}
                <CurrencyIcon type='primary' />
              </span>
              <span className={cn(styles.name, 'text_type_main-default')}>{item.name}</span>
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
