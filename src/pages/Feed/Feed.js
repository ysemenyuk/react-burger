import cn from 'classnames';
import styles from './Feed.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsAllOrdersConnectionStart } from '../../redux/actions/wsAllOrdersActions';
import Loader from '../../components/UI/Loader/Loader';
import OrdersList from '../../components/OrdersList/OrdersList';
import OrdersStatistic from '../../components/OrdersStatistic/OrdersStatistic';
import { getIngredients } from '../../redux/actions/ingredientsActions';

function Feed() {
  const dispatch = useDispatch();
  const wsAllOrders = useSelector((state) => state.wsAllOrders);
  const { connected, allOrders, ordersTotal, ordersTotalToday } = wsAllOrders;
  const { loading, success } = useSelector((state) => state.ingredients);

  const completedOrders = allOrders.filter((i) => i.status === 'done').slice(0, 10);
  const inProgressOrders = allOrders.filter((i) => i.status !== 'done').slice(0, 10);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(wsAllOrdersConnectionStart());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={cn(styles.title, 'text', 'text_type_main-large')}>Лента заказов</h1>
      {(!connected || loading) && <Loader height='300px' />}
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
