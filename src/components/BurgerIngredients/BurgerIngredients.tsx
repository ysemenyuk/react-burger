import cn from 'classnames';
import styles from './BurgerIngredients.module.css';

import { useState, useRef, useMemo, FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useScroll } from '../../hooks/useScroll';
import { itemsTypes } from '../../utils/constants';
import { calculateQuantity, groupByType } from '../../utils/helpers';
import { constructorSelectors, ingredientsSelectors } from '../../redux/selectors';
import { TIngredient } from '../../types/ingredientsTypes';
import { setIngredientDetails } from '../../redux/actions/ingredientsActions';

const ingredientsGroups = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

type TTargets = {
  [name: string]: HTMLElement;
};

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const ingredients = useAppSelector(ingredientsSelectors.items);
  const orderItems = useAppSelector(constructorSelectors.orderItems);

  const ingredientsByType = useMemo(() => groupByType(ingredients), [ingredients]);
  const quantity = useMemo(() => calculateQuantity(orderItems), [orderItems]);

  const [currentTab, setCurrentTab] = useState(itemsTypes.BUN);

  const containerRef = useRef<HTMLUListElement>(null);
  const targetsRefs = useRef<TTargets>({});

  useScroll(containerRef, targetsRefs, (entry: any) => setCurrentTab(entry.target.dataset.type));

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

  const ref = (type: string) => (el: HTMLHeadingElement) => {
    targetsRefs.current[type] = el;
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
              ref={ref(type)}
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
