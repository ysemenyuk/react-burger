import { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import cn from 'classnames';
import styles from './BurgerIngredients.module.css';

import { useScroll } from '../../hooks/useScroll';
import { ItemTypes } from '../../utils/constants';
import { calculateQuantity } from '../../utils/calculateQuantity';

const ingridientsGroups = [
  { type: ItemTypes.BUN, title: 'Булки' },
  { type: ItemTypes.SAUCE, title: 'Соусы' },
  { type: ItemTypes.MAIN, title: 'Начинки' },
];

function BurgerIngredients() {
  const { ingridientsByGroup } = useSelector((state) => state.ingridients);
  const orderItems = useSelector((state) => state.orderItems);

  const [currentTab, setCurrentTab] = useState(ItemTypes.BUN);
  const [currentItem, setCurrentItem] = useState({ visible: false, item: null });

  const containerRef = useRef(null);
  const targetsRefs = useRef({});

  useScroll(containerRef, targetsRefs, (entry) => setCurrentTab(entry.target.dataset.type));

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
    setCurrentItem({ visible: true, item: item });
  };

  const handleCloseModal = () => {
    setCurrentItem({ visible: false, item: null });
  };

  return (
    <section className={cn(styles.section, 'p-5')}>
      {currentItem.visible && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails item={currentItem.item} />
        </Modal>
      )}

      <ul className={cn(styles.tabs, 'mb-10')}>
        {ingridientsGroups.map(({ type, title }) => (
          <li key={type}>
            <Tab value={type} active={currentTab === type} onClick={handleTabClick}>
              {title}
            </Tab>
          </li>
        ))}
      </ul>

      <ul ref={containerRef} className={cn(styles.ingridientsList)}>
        {ingridientsGroups.map(({ type, title }) => (
          <li key={type}>
            <h2
              ref={(el) => (targetsRefs.current[type] = el)}
              data-type={type}
              className={cn('text', 'text_type_main-medium', 'mb-2')}
            >
              {title}
            </h2>
            <ul className={cn(styles.ingridientsGroup, 'mb-10')}>
              {ingridientsByGroup[type].map((item) => {
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
