import cn from 'classnames';
import styles from './BurgerIngredients.module.css';

import { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';

import { useScroll } from '../../hooks/useScroll';
import { ItemTypes } from '../../utils/constants';
import { calculateQuantity, groupByType } from '../../utils/helpers';
import { setCurrentIngredient } from '../../redux/actions/ingredientsActions';
import constructorSelectors from '../../redux/selectors/constructorSelectors';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';

const ingredientsGroups = [
  { type: ItemTypes.BUN, title: 'Булки' },
  { type: ItemTypes.SAUCE, title: 'Соусы' },
  { type: ItemTypes.MAIN, title: 'Начинки' },
];

function BurgerIngredients() {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const ingredients = useSelector(ingredientsSelectors.items);
  const orderItems = useSelector(constructorSelectors.orderItems);

  const ingredientsByType = useMemo(() => groupByType(ingredients), [ingredients]);
  const quantity = useMemo(() => calculateQuantity(orderItems), [orderItems]);

  const [currentTab, setCurrentTab] = useState(ItemTypes.BUN);

  const containerRef = useRef(null);
  const targetsRefs = useRef({});

  useScroll(containerRef, targetsRefs, (entry) => setCurrentTab(entry.target.dataset.type));

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

    history.push({
      pathname: `/ingredients/${item._id}`,
      state: { background: location },
    });
  };

  return (
    <section className={cn(styles.section)}>
      <ul className={cn(styles.tabs)}>
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
              className={cn(styles.ingredientsGroupTitle, 'text', 'text_type_main-medium')}
            >
              {title}
            </h2>
            <ul className={cn(styles.ingredientsGroup)}>
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
