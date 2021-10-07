import cn from 'classnames';
import styles from './UserOrdersList.module.css';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';

import userOrdersSelectors from '../../redux/selectors/userOrdersSelectors';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

import {
  wsUserOrdersConnectionClose,
  wsUserOrdersConnectionStart,
} from '../../redux/actions/userOrdersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import { setOrderDetails } from '../../redux/actions/allOrdersActions';
import { TOrder } from '../../types/types';

const UserOrdersList: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const { wsConnected, wsError, userOrders } = useSelector(userOrdersSelectors.wsUserOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(wsUserOrdersConnectionStart());
    return () => {
      dispatch(wsUserOrdersConnectionClose());
    };
  }, [dispatch]);

  const handleCardClick = (item: TOrder) => () => {
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
          {userOrders.map((order: TOrder) => (
            <OrderCard
              key={order._id}
              order={order}
              onCardClick={handleCardClick(order)}
              userCard
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default UserOrdersList;
