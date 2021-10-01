import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './OrderDetails.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate, getOrderStatus } from '../../utils/helpers';
import useOrderDetails from '../../hooks/useOrderDetails';

function OrderDetails({ order }) {
  const { name, status, createdAt } = order;
  const { orderIngredients, orderPrice } = useOrderDetails(order);

  return (
    <section className={cn(styles.container, 'text_type_main-default')}>
      <span className={cn(styles.name, 'text_type_main-medium')}>{name}</span>
      <span className={cn(styles.status, 'text_type_main-default')}>
        {getOrderStatus(status)}
      </span>
      <span className={cn(styles.title, 'text_type_main-medium')}>Состав:</span>

      <ul className={cn(styles.ingredientsList)}>
        {orderIngredients.map((ingredient) => {
          const { image_mobile, name, price, qnty } = ingredient;
          return (
            <li key={ingredient._id} className={styles.ingredient}>
              <div className={styles.ingredientIcon}>
                <img src={image_mobile} alt='ingredient' />
              </div>
              <div className={styles.ingredientInfo}>
                <span className={cn(styles.ingredientName, 'text', 'text_type_main-default')}>
                  {name}
                </span>
                <span
                  className={cn(styles.ingredientPrice, 'text', 'text_type_digits-default')}
                >
                  {qnty} x {price} &nbsp;
                  <CurrencyIcon type='primary' />
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <span className='text text_type_main-default text_color_inactive'>
          {getFormattedDate(createdAt)}
        </span>
        <span className={cn(styles.orderPrice, 'text_type_digits-default')}>
          {orderPrice} &nbsp;
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </section>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }),
};

export default OrderDetails;
