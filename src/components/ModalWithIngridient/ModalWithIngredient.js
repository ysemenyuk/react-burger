import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import { resetCurrentIngredient } from '../../redux/actions/ingredientsActions';

function ModalWithIngredient() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentIngredient } = useSelector((state) => state.ingredientDetails);

  const handleCloseModal = () => {
    history.goBack();
    dispatch(resetCurrentIngredient());
  };

  if (!currentIngredient) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
      <IngredientDetails item={currentIngredient} />
    </Modal>
  );
}

export default ModalWithIngredient;
