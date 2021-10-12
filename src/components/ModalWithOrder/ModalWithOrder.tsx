import { useHistory } from 'react-router-dom';
import { FC } from 'react';

import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import { resetOrderDetails } from '../../redux/actions/ordersActions';
import { ordersSelectors } from '../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const ModalWithOrder: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const orderDetails = useAppSelector(ordersSelectors.orderDetails);

  const handleCloseModal = () => {
    history.goBack();
    dispatch(resetOrderDetails());
  };

  if (!orderDetails) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal} title={`#${orderDetails.number}`}>
      <OrderDetails order={orderDetails} />
    </Modal>
  );
};

export default ModalWithOrder;
