import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import allOrdersSelectors from '../../redux/selectors/allOrdersSelectors';
import { resetOrderDetails } from '../../redux/actions/allOrdersActions';

function ModalWithOrder() {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderDetails = useSelector(allOrdersSelectors.orderDetails);

  const handleCloseModal = () => {
    history.goBack();
    dispatch(resetOrderDetails());
  };

  if (!orderDetails) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal} title={`#${orderDetails.number}`} titleSize='small'>
      <OrderDetails order={orderDetails} />
    </Modal>
  );
}

export default ModalWithOrder;
