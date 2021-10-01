import cn from 'classnames';
import styles from './OrderCard.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import useOrderDetails from '../../hooks/useOrderDetails';
import { getFormattedDate, getOrderStatus } from '../../utils/helpers';

function OrderCard({ order, onCardClick, userCard }) {
  const { name, number, status, createdAt } = order;
  const { orderIngredients, orderPrice } = useOrderDetails(order);

  const ingredientsIcons = () => {
    const iconsForRender = orderIngredients.slice(0, 5);
    const restIcons = orderIngredients.slice(5);
    return (
      <>
        {iconsForRender.map((item, index) => (
          <li key={index} className={styles.ingredientIcon} style={{ zIndex: 10 - index }}>
            <img src={item.image_mobile} alt='ingredient' />
          </li>
        ))}
        {!!restIcons.length && (
          <li key={restIcons[0]._id} className={styles.ingredientIcon} style={{ zIndex: 0 }}>
            <img src={restIcons[0].image_mobile} alt='ingredient' style={{ opacity: 0.8 }} />
            <span className={cn(styles.text, 'text', 'text_type_digits-default')}>
              {`+${restIcons.length}`}
            </span>
          </li>
        )}
      </>
    );
  };

  return (
    <li className={cn(styles.itemCard)} onClick={onCardClick(order)}>
      <header className={styles.header}>
        <span className={cn(styles.orderId, 'text', 'text_type_digits-default')}>
          {`#${number}`}
        </span>
        <span className={cn(styles.timestamp, 'text', 'text_color_inactive')}>
          {getFormattedDate(createdAt)}
        </span>
      </header>

      <span className={cn(styles.name, 'text', 'text_type_main-medium')}>{name}</span>

      {userCard && (
        <span className={cn(styles.status, 'text_type_main-default')}>
          {getOrderStatus(status)}
        </span>
      )}

      <div className={styles.orderInfo}>
        <ul className={styles.ingredients}>{ingredientsIcons()}</ul>
        <span className={cn(styles.price, 'text', 'text_type_digits-medium')}>
          {orderPrice} <CurrencyIcon type='primary' />
        </span>
      </div>
    </li>
  );
}

export default OrderCard;
