import cn from 'classnames';
import styles from './OrderCreateDetails.module.css';

import { FC } from 'react';

import done from '../../images/done.gif';

interface IProps {
  orderNumber: string;
}

const OrderCreateDetails: FC<IProps> = ({ orderNumber }) => {
  return (
    <section className={cn(styles.container, 'text_type_main-default')}>
      <span className={cn(styles.number, 'text_type_digits-large')}>{orderNumber}</span>
      <span className={cn(styles.textNumber, 'text_type_main-medium')}>идентификатор заказа</span>
      <img src={done} alt={'done'} />
      <span className={cn(styles.textStart)}>Ваш заказ начали готовить</span>
      <span className={cn(styles.textWait, 'text_color_inactive')}>
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
};

export default OrderCreateDetails;
