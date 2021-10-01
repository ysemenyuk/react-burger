import styles from './Order.module.css';
import cn from 'classnames';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import {
  fetchAllOrders,
  wsAllOrdersConnectionStart,
} from '../../redux/actions/wsAllOrdersActions';

import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import allOrdersSelectors from '../../redux/selectors/allOrdersSelectors';

function Order() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // const getItems = useSelector(ingredientsSelectors.getItems);
  // const getAllOrders = useSelector(allOrdersSelectors.getAllOrders);

  // const loading = getItems.loading || getAllOrders.loading;
  // const error = getItems.error || getAllOrders.error;
  // const success = getItems.success && getAllOrders.success;

  // useEffect(() => {
  //   !getItems.success && dispatch(getIngredients());
  //   !getAllOrders.success && dispatch(fetchAllOrders());
  // }, []);

  const { connected, allOrders } = useSelector(allOrdersSelectors.getAllOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
    !connected && dispatch(wsAllOrdersConnectionStart());
  }, [dispatch, success, connected]);

  useEffect(() => {}, [dispatch]);

  const currentOrder = allOrders.find((i) => i._id === id);

  return (
    <div className={styles.container}>
      {loading && <Loader height='300px' />}
      {error && <Message message={'error'} />}
      {success && currentOrder && (
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
