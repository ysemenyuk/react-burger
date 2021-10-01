import cn from 'classnames';
import styles from './UserOrdersList.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';

import userOrdersSelectors from '../../redux/selectors/userOrdersSelectors';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

import { wsUserOrdersConnectionStart } from '../../redux/actions/userOrdersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import { setOrderDetails } from '../../redux/actions/allOrdersActions';

function UserOrdersList() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const { wsConnected, wsError, userOrders } = useSelector(userOrdersSelectors.wsUserOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    !wsConnected && dispatch(wsUserOrdersConnectionStart());
  }, [dispatch, wsConnected]);

  const handleCardClick = (item) => () => {
    dispatch(setOrderDetails(item));

    history.push({
      pathname: `/profile/orders/${item._id}`,
      state: { background: location },
    });
  };

  return (
    <section className={cn(styles.section)}>
      {(!wsConnected || loading) && <Loader height='300px' />}
      {(wsError || error) && <Message message={'Network error'} />}
      {wsConnected && success && !!userOrders.length && (
        <ul className={cn(styles.ordersList)}>
          {userOrders.map((item) => (
            <OrderCard key={item._id} order={item} onCardClick={handleCardClick} userCard />
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserOrdersList;
