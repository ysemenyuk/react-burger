import cn from 'classnames';
import styles from './ToppingCard.module.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

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
    <li style={{ opacity }} ref={ref} draggable className={cn(styles.item)}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleDeleteCard(item.uuid)}
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
  index: PropTypes.number.isRequired,
  handleMoveCard: PropTypes.func.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
};

export default ToppingCard;
