import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import cn from 'classnames';
import styles from './BunCard.module.css';

function BunCard({ item, top }) {
  const { name, price, image } = item;
  return (
    <div className={cn(styles.bun, 'm-4')}>
      <ConstructorElement
        type={top ? 'top' : 'bottom'}
        isLocked={true}
        text={`${name} ${top ? '(верх)' : '(низ)'}`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
}

BunCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
  top: PropTypes.bool,
};

export default BunCard;
