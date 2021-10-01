import cn from 'classnames';
import styles from './UserOrdersList.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard';
import Loader from '../UI/Loader/Loader';
import Message from '../UI/Message/Message';

import { showOrderDetails } from '../../redux/actions/wsAllOrdersActions';
import userOrdersSelectors from '../../redux/selectors/userOrdersSelectors';
import { wsUserOrdersConnectionStart } from '../../redux/actions/wsUserOrdersActions';
import { getIngredients } from '../../redux/actions/ingredientsActions';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

function UserOrdersList() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const { connected, userOrders } = useSelector(userOrdersSelectors.getUserOrders);
  const { loading, success, error } = useSelector(ingredientsSelectors.getItems);

  useEffect(() => {
    !success && dispatch(getIngredients());
    !connected && dispatch(wsUserOrdersConnectionStart());
  }, [dispatch, success, connected]);

  const handleCardClick = (item) => () => {
    dispatch(showOrderDetails(item));

    history.push({
      pathname: `/profile/orders/${item._id}`,
      state: { background: location },
    });
  };

  return (
    <section className={cn(styles.section)}>
      {(!connected || loading) && <Loader height='300px' />}
      {error && <Message message={error.message} />}
      <ul className={cn(styles.ordersList)}>
        {userOrders.map((item) => (
          <OrderCard key={item._id} order={item} onCardClick={handleCardClick} userCard />
        ))}
      </ul>
    </section>
  );
}

export default UserOrdersList;
