import cn from 'classnames';
import styles from './IngridientCard.module.css';

import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { INGRIDIENTS } from '../../../utils/constants';
import { TIngredient } from '../../../types/types';

interface IProps {
  item: TIngredient;
  count: number;
  onCardClick: () => void;
}

const IngridientCard: FC<IProps> = ({ item, count = 0, onCardClick }) => {
  const [{ opacity }, drag] = useDrag({
    type: INGRIDIENTS,
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  return (
    <li
      style={{ opacity }}
      ref={drag}
      className={cn(styles.itemCard, 'm-4', 'mr-2')}
      onClick={onCardClick}
    >
      <Counter count={count} size='default' />
      <img src={item.image} alt={item.name}></img>
      <span className={cn(styles.price, 'text_type_digits-default')}>
        {item.price}
        <CurrencyIcon type='primary' />
      </span>
      <span className={cn(styles.name, 'text_type_main-default')}>{item.name}</span>
    </li>
  );
};

export default IngridientCard;
