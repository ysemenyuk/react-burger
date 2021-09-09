import { useRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ToppingCard.module.css';

import { TOPPINGS } from '../../../utils/constants';

function ToppingCard({ item, index, handleMoveCard, handleDeleteCard }) {
  const ref = useRef(null);

  const [{ opacity }, drop] = useDrop({
    accept: TOPPINGS,
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0 : 1,
    }),
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      handleMoveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: TOPPINGS,
    item: { ...item, index },
  });

  drag(drop(ref));

  return (
    <li
      style={{ opacity }}
      ref={ref}
      draggable
      className={cn(styles.item, 'mb-4', 'ml-4', 'mr-4')}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteCard(index)}
      />
    </li>
  );
}

ToppingCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  handleMoveCard: PropTypes.func,
  handleDeleteCard: PropTypes.func,
};

export default ToppingCard;
