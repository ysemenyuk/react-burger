import cn from 'classnames';
import styles from './IngridientCard.module.css';

import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { INGRIDIENTS } from '../../../utils/constants';

function IngridientCard({ item, count = 0, onCardClick }) {
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
      onClick={onCardClick(item)}
    >
      <Counter count={count} size='default' />
      <img src={item.image} alt={item.name} className={cn('mr-4', 'ml-4', 'mb-2')}></img>
      <span className={cn(styles.price, 'text_type_digits-default', 'mb-2')}>
        {item.price}
        <CurrencyIcon type='primary' />
      </span>
      <span className={cn(styles.name, 'text_type_main-default')}>{item.name}</span>
    </li>
  );
}

IngridientCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default IngridientCard;
