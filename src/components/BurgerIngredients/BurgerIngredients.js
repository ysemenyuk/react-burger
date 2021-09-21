import cn from 'classnames';
import styles from './BurgerIngredients.module.css';

import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { useScroll } from '../../hooks/useScroll';
import { ItemTypes } from '../../utils/constants';
import { calculateQuantity } from '../../utils/calculateQuantity';
import {
  resetCurrentIngredient,
  setCurrentIngredient,
} from '../../redux/actions/ingredientsActions';
import groupByType from '../../utils/groupByType';

const ingredientsGroups = [
  { type: ItemTypes.BUN, title: 'Булки' },
  { type: ItemTypes.SAUCE, title: 'Соусы' },
  { type: ItemTypes.MAIN, title: 'Начинки' },
];

function BurgerIngredients() {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector((state) => state.ingredients.items);
  const orderItems = useSelector((state) => state.orderItems);
  const { isModalOpen, currentIngredient } = useSelector((state) => state.ingredientDetails);

  const [currentTab, setCurrentTab] = useState(ItemTypes.BUN);

  const containerRef = useRef(null);
  const targetsRefs = useRef({});

  useScroll(containerRef, targetsRefs, (entry) => setCurrentTab(entry.target.dataset.type));

  const ingredientsByType = useMemo(() => groupByType(items), [items]);
  const quantity = useMemo(() => calculateQuantity(orderItems), [orderItems]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);

    const target = targetsRefs.current[tab];
    const container = containerRef.current;

    if (target && container) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (item) => () => {
    dispatch(setCurrentIngredient(item));
    history.replace({ pathname: `/ingredients/${item._id}` });
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentIngredient());
    history.replace({ pathname: `/` });
  };

  return (
    <section className={cn(styles.section, 'p-5')}>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}

      <ul className={cn(styles.tabs, 'mb-10')}>
        {ingredientsGroups.map(({ type, title }) => (
          <li key={type}>
            <Tab value={type} active={currentTab === type} onClick={handleTabClick}>
              {title}
            </Tab>
          </li>
        ))}
      </ul>

      <ul ref={containerRef} className={cn(styles.ingredientsList)}>
        {ingredientsGroups.map(({ type, title }) => (
          <li key={type}>
            <h2
              ref={(el) => (targetsRefs.current[type] = el)}
              data-type={type}
              className={cn('text', 'text_type_main-medium', 'mb-2')}
            >
              {title}
            </h2>
            <ul className={cn(styles.ingredientsGroup, 'mb-10')}>
              {ingredientsByType[type].map((item) => {
                return (
                  <IngridientCard
                    key={item._id}
                    count={quantity[item._id]}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredients;
