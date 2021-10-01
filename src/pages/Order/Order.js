import styles from './Order.module.css';
import cn from 'classnames';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import { wsAllOrdersConnectionStart } from '../../redux/actions/allOrdersActions';

import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import allOrdersSelectors from '../../redux/selectors/allOrdersSelectors';

function Order() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { wsConnected, wsError, allOrders } = useSelector(allOrdersSelectors.wsAllOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    !wsConnected && dispatch(wsAllOrdersConnectionStart());
  }, [dispatch, wsConnected]);

  const currentOrder = allOrders.find((i) => i._id === id);

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

export default Order;
