import cn from 'classnames';
import styles from './ToppingCard.module.css';

import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TOPPINGS } from '../../../utils/constants';
import { TTopping } from '../../../types/constructorTypes';

interface IProps {
  item: TTopping;
  index: number;
  handleMoveCard: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteCard: (uuid: string) => void;
}

const ToppingCard: FC<IProps> = ({ item, index, handleMoveCard, handleDeleteCard }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, drop] = useDrop({
    accept: TOPPINGS,
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0 : 1,
    }),
    hover(item: { id: string; index: number }) {
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
};

export default ToppingCard;
