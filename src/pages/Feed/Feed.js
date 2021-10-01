import cn from 'classnames';
import styles from './Feed.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/UI/Loader/Loader';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStatistic from '../../components/OrdersStatistic/OrdersStatistic';
import Message from '../../components/UI/Message/Message';

import { wsAllOrdersConnectionStart } from '../../redux/actions/wsAllOrdersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import allOrdersSelectors from '../../redux/selectors/allOrdersSelectors';

function Feed() {
  const dispatch = useDispatch();

  const getAllOrders = useSelector(allOrdersSelectors.getAllOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);
  const { connected, allOrders, ordersTotal, ordersTotalToday } = getAllOrders;

  const completedOrders = allOrders.filter((i) => i.status === 'done').slice(0, 10);
  const inProgressOrders = allOrders.filter((i) => i.status !== 'done').slice(0, 10);

  useEffect(() => {
    !success && dispatch(getIngredients());
    !connected && dispatch(wsAllOrdersConnectionStart());
  }, [dispatch, success, connected]);

  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-large')}>Лента заказов</h1>
      {(!connected || loading) && <Loader height='300px' />}
      {error && <Message message={error.message} />}
      {connected && !loading && !!allOrders.length && (
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
