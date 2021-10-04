import PropTypes from 'prop-types';
import cn from 'classnames';

import done from '../../../images/done.gif';
import styles from './OrderCreateDetails.module.css';

function OrderCreateDetails({ order }) {
  return (
    <section className={cn(styles.container, 'text_type_main-default')}>
      <span className={cn(styles.number, 'text_type_digits-large')}>{order.number}</span>
      <span className={cn(styles.textNumber, 'text_type_main-medium')}>
        идентификатор заказа
      </span>
      <img src={done} alt={'done'} />
      <span className={cn(styles.textStart)}>Ваш заказ начали готовить</span>
      <span className={cn(styles.textWait, 'text_color_inactive')}>
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
}

OrderCreateDetails.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }),
};

export default OrderCreateDetails;
