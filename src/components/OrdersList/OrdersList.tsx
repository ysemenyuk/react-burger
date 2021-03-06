import cn from 'classnames';
import styles from './OrdersList.module.css';

import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';

import { setOrderDetails } from '../../redux/actions/ordersActions';
import { TOrder } from '../../types/ordersTypes';
import { useAppDispatch } from '../../hooks/useRedux';

interface IProps {
  ordersList: Array<TOrder>;
}

const OrdersList: FC<IProps> = ({ ordersList }) => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation();

  const handleCardClick = (item: TOrder) => () => {
    dispatch(setOrderDetails(item));

    history.push({
      pathname: `/feed/${item._id}`,
      state: { background: location },
    });
  };

  return (
    <section className={cn(styles.section)}>
      <ul className={cn(styles.ordersList)}>
        {ordersList.map((order: TOrder) => (
          <OrderCard key={order._id} order={order} onCardClick={handleCardClick(order)} />
        ))}
      </ul>
    </section>
  );
};

export default OrdersList;
