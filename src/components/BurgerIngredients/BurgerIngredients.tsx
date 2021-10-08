import cn from 'classnames';
import styles from './BurgerIngredients.module.css';

import { useState, useRef, useMemo, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';

import { useScroll } from '../../hooks/useScroll';
import { itemsTypes } from '../../utils/constants';
import { calculateQuantity, groupByType } from '../../utils/helpers';
import { setIngredientDetails } from '../../redux/actions/ingredientsActions';
import constructorSelectors from '../../redux/selectors/constructorSelectors';
import ingredientsSelectors from '../../redux/selectors/ingredientsSelectors';
import { TIngredient } from '../../types/types';

const ingredientsGroups = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

type TTargets = {
  [name: string]: HTMLElement | null;
};

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const ingredients = useSelector(ingredientsSelectors.items);
  const orderItems = useSelector(constructorSelectors.orderItems);

  const ingredientsByType = useMemo(() => groupByType(ingredients), [ingredients]);
  const quantity = useMemo(() => calculateQuantity(orderItems), [orderItems]);

  const [currentTab, setCurrentTab] = useState(itemsTypes.BUN);

  const containerRef = useRef<HTMLUListElement>(null);
  const targetsRefs = useRef<TTargets>({});

  useScroll(containerRef.current, targetsRefs.current, (entry: any) =>
    setCurrentTab(entry.target.dataset.type)
  );

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);

    const container = containerRef.current;
    const target = targetsRefs.current[tab];

    if (target && container) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (item: TIngredient) => () => {
    dispatch(setIngredientDetails(item));

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
              {ingredientsByType[type].map((item: TIngredient) => {
                return (
                  <IngridientCard
                    key={item._id}
                    count={quantity[item._id]}
                    item={item}
                    onCardClick={handleCardClick(item)}
                  />
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
