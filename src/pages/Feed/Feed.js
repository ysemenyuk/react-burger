import cn from 'classnames';
import styles from './Feed.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/UI/Loader/Loader';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStatistic from '../../components/OrdersStatistic/OrdersStatistic';
import Message from '../../components/UI/Message/Message';

import {
  wsAllOrdersConnectionClose,
  wsAllOrdersConnectionStart,
} from '../../redux/actions/allOrdersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import allOrdersSelectors from '../../redux/selectors/allOrdersSelectors';

function Feed() {
  const dispatch = useDispatch();

  const wsAllOrders = useSelector(allOrdersSelectors.wsAllOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  const { wsConnected, wsError, allOrders, ordersTotal, ordersTotalToday } = wsAllOrders;

  const completedOrders = allOrders.filter((i) => i.status === 'done').slice(0, 10);
  const inProgressOrders = allOrders.filter((i) => i.status !== 'done').slice(0, 10);

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
            completedOrders={completedOrders}
            inProgressOrders={inProgressOrders}
            ordersTotal={ordersTotal}
            ordersTotalToday={ordersTotalToday}
          />
        </div>
      )}
    </div>
  );
}

export default Feed;