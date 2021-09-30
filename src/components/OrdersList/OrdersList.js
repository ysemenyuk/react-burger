import cn from 'classnames';
import styles from './OrdersList.module.css';

import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import OrderCard from '../OrderCard/OrderCard';

function OrdersList({ ordersList }) {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  return (
    <section className={cn(styles.section)}>
      <ul className={cn(styles.ordersList)}>
        {ordersList.map((item) => (
          <OrderCard key={item._id} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default OrdersList;
