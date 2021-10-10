import cn from 'classnames';
import { FC } from 'react';
import { TOrder } from '../../types/mainTypes';
import styles from './OrdersStatistic.module.css';

interface IProps {
  ordersList: Array<TOrder>;
  ordersTotal: string;
  ordersTotalToday: string;
}

const OrderStatistic: FC<IProps> = ({ ordersList, ordersTotal, ordersTotalToday }) => {
  const completedOrders = ordersList.filter(({ status }) => status === 'done').slice(0, 10);
  const inProgressOrders = ordersList.filter(({ status }) => status !== 'done').slice(0, 10);

  return (
    <section className={cn(styles.section)}>
      <div className={styles.orders}>
        <div className={styles.column}>
          <div className={cn('text', 'text_type_main-medium')}>Готовы:</div>
          <div className={styles.list}>
            {completedOrders.map((order) => (
              <span
                key={order._id}
                className={cn(styles.completed, 'text', 'text_type_digits-default')}
              >
                {`#${order.number}`}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={cn('text', 'text_type_main-medium')}>В работе:</div>
          <div className={styles.list}>
            {inProgressOrders.map((order) => (
              <span
                key={order._id}
                className={cn(styles.inProgress, 'text', 'text_type_digits-default')}
              >
                {`#${order.number}`}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={cn(styles.total)}>
        <div className={cn('text', 'text_type_main-medium')}>Выполнено за все время:</div>
        <div className={cn(styles.count, 'text', 'text_type_digits-large')}>{ordersTotal}</div>
      </div>
      <div className={cn(styles.today)}>
        <div className={cn('text', 'text_type_main-medium')}>Выполнено за сегодня:</div>
        <div className={cn(styles.count, 'text', 'text_type_digits-large')}>
          {ordersTotalToday}
        </div>
      </div>
    </section>
  );
};

export default OrderStatistic;
