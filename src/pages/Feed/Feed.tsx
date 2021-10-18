import cn from 'classnames';
import styles from './Feed.module.css';

import { FC, useEffect } from 'react';

import Loader from '../../components/UI/Loader/Loader';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStatistic from '../../components/OrdersStatistic/OrdersStatistic';
import Message from '../../components/UI/Message/Message';

import {
  wsAllOrdersConnectionClose,
  wsAllOrdersConnectionStart,
} from '../../redux/actions/ordersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import { ingredientsSelectors, ordersSelectors } from '../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const wsAllOrders = useAppSelector(ordersSelectors.wsAllOrders);
  const { loading, success, error } = useAppSelector(ingredientsSelectors.getItems);

  const { wsConnected, wsError, allOrders, ordersTotal, ordersTotalToday } = wsAllOrders;

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    !wsConnected && dispatch(wsAllOrdersConnectionStart());
    return () => {
      wsConnected && dispatch(wsAllOrdersConnectionClose());
    };
  }, [dispatch, wsConnected]);

  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-large')}>Лента заказов</h1>
      {(!wsConnected || loading) && <Loader height='300px' />}
      {(wsError || error) && <Message message={'Network error'} />}
      {wsConnected && success && !!allOrders.length && (
        <div className={styles.feed}>
          <OrdersList ordersList={allOrders} />
          <OrdersStatistic
            ordersList={allOrders}
            ordersTotal={ordersTotal}
            ordersTotalToday={ordersTotalToday}
          />
        </div>
      )}
    </div>
  );
};

export default Feed;
