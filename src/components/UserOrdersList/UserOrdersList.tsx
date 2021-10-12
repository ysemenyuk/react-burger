import cn from 'classnames';
import styles from './UserOrdersList.module.css';

import { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';

import {
  wsUserOrdersConnectionClose,
  wsUserOrdersConnectionStart,
} from '../../redux/actions/ordersActions';

import { getIngredients } from '../../redux/actions/ingredientsActions';
import { setOrderDetails } from '../../redux/actions/ordersActions';

import { ingredientsSelectors, ordersSelectors } from '../../redux/selectors';
import { TOrder } from '../../types/ordersTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const UserOrdersList: FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();
  const location = useLocation();

  const { wsConnected, wsError, userOrders } = useAppSelector(ordersSelectors.wsUserOrders);
  const { loading, success, error } = useAppSelector(ingredientsSelectors.getItems);

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
