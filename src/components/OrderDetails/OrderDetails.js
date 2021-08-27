import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';

import done from '../../images/done.gif';
import styles from './OrderDetails.module.css';

function OrderDetails(props) {
  return (
    <section className={cn(styles.container, 'text_type_main-default', 'mb-10', 'mt-10')}>
      <span className={cn(styles.num, 'text_type_digits-large', 'mt-10')}>034536</span>
      <span className={cn('text_type_main-medium', 'mt-8')}>идентификатор заказа</span>
      <img className={cn('mt-15', 'mb-15')} src={done} alt={'done'} />
      <span className={cn('mb-2')}>Ваш заказ начали готовить</span>
      <span className={cn('mb-10', 'text_color_inactive')}>
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
}

// IngredientDetails.propTypes = {};

export default OrderDetails;
