import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import { resetIngredientDetails } from '../../redux/actions/ingredientsActions';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

function ModalWithIngredient() {
  const dispatch = useDispatch();
  const history = useHistory();

  const ingredientDetails = useSelector(ingredientsSelectors.ingredientDetails);

  const handleCloseModal = () => {
    history.goBack();
    dispatch(resetIngredientDetails());
  };

  if (!ingredientDetails) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
      <IngredientDetails item={ingredientDetails} />
    </Modal>
  );
}

export default ModalWithIngredient;
