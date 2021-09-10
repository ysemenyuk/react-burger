import PropTypes from 'prop-types';
import cn from 'classnames';

import done from '../../images/done.gif';
import styles from './OrderDetails.module.css';
import Loader from '../UI/Loader/Loader';

function OrderDetails({ loading, order }) {
  return (
    <section className={cn(styles.container, 'text_type_main-default', 'mb-10', 'mt-10')}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <span className={cn(styles.num, 'text_type_digits-large', 'mt-10')}>{order.number}</span>
          <span className={cn('text_type_main-medium', 'mt-8')}>идентификатор заказа</span>
          <img className={cn('mt-15', 'mb-15')} src={done} alt={'done'} />
          <span className={cn('mb-2')}>Ваш заказ начали готовить</span>
          <span className={cn('mb-10', 'text_color_inactive')}>
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      )}
    </section>
  );
}

OrderDetails.propTypes = {
  loading: PropTypes.bool,
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }),
};

export default OrderDetails;
