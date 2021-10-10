import styles from './Order.module.css';
import cn from 'classnames';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import {
  wsAllOrdersConnectionClose,
  wsAllOrdersConnectionStart,
} from '../../redux/actions/allOrdersActions';

import { TOrder, TPageParams } from '../../types/mainTypes';
import { ingredientsSelectors, ordersSelectors } from '../../redux/selectors';

const Order: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<TPageParams>();

  const { wsConnected, wsError, allOrders } = useSelector(ordersSelectors.wsAllOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    !wsConnected && dispatch(wsAllOrdersConnectionStart());
    return () => {
      wsConnected && dispatch(wsAllOrdersConnectionClose());
    };
  }, [dispatch, wsConnected]);

  const currentOrder = allOrders.find((order: TOrder) => order._id === id);
  console.log(1, currentOrder);

  return (
    <div className={styles.container}>
      {(!wsConnected || loading) && <Loader height='300px' />}
      {(wsError || error) && <Message message={'Network error'} />}
      {wsConnected && success && currentOrder && (
        <>
          <span className={cn(styles.title, 'text_type_digits-default')}>
            # {currentOrder.number}
          </span>
          <OrderDetails order={currentOrder} />
        </>
      )}
    </div>
  );
};

export default Order;
