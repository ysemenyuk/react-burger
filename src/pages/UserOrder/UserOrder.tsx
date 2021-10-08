import styles from './UserOrder.module.css';
import cn from 'classnames';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import userOrdersSelectors from '../../redux/selectors/userOrdersSelectors';
import {
  wsUserOrdersConnectionClose,
  wsUserOrdersConnectionStart,
} from '../../redux/actions/userOrdersActions';
import { TOrder, TPageParams } from '../../types/types';

function UserOrder() {
  const dispatch = useDispatch();
  const { id } = useParams<TPageParams>();

  const { wsConnected, wsError, userOrders } = useSelector(userOrdersSelectors.wsUserOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    !wsConnected && dispatch(wsUserOrdersConnectionStart());
    return () => {
      wsConnected && dispatch(wsUserOrdersConnectionClose());
    };
  }, [dispatch, wsConnected]);

  const currentOrder = userOrders.find((order: TOrder) => order._id === id);

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
}

export default UserOrder;
