import { useHistory } from 'react-router-dom';
import { FC } from 'react';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import { resetIngredientDetails } from '../../redux/actions/ingredientsActions';
import { ingredientsSelectors } from '../../redux/selectors/';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const ModalWithIngredient: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const ingredientDetails = useAppSelector(ingredientsSelectors.ingredientDetails);

  const handleCloseModal = () => {
    history.goBack();
    dispatch(resetIngredientDetails());
  };

  if (!ingredientDetails) {
    return null;
  }

  return (
    <Modal onClose={handleCloseModal} title={'Детали ингредиента'} largeTitle>
      <IngredientDetails ingredient={ingredientDetails} />
    </Modal>
  );
};

export default ModalWithIngredient;
