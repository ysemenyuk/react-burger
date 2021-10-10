import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';

import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import { resetOrderDetails } from '../../redux/actions/allOrdersActions';
import { ordersSelectors } from '../../redux/selectors';

const ModalWithOrder: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderDetails = useSelector(ordersSelectors.orderDetails);

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
