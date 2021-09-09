import React from 'react';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ToppingCard.module.css';

function ToppingCard({ item, handleDeleteItem, index }) {
  const [{ opacity }, drag] = useDrag({
    type: 'items',
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li
      style={{ opacity }}
      ref={drag}
      className={cn(styles.item, 'mb-4', 'ml-4', 'mr-4')}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteItem(index)}
      />
    </li>
  );
}

// ModalOverlay.propTypes = {
//   children: PropTypes.element,
//   handleClickOnOverlay: PropTypes.func,
// };

export default ToppingCard;
