import { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './IngridientCard/IngridientCard';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import styles from './BurgerIngredients.module.css';
import ingridientPropTypes from '../../utils/ingridientPropTypes';

import { setCurrentItem, resetCurrentItem } from '../../services/actions/ingridientsActions';
import { useScroll } from '../../hooks/useScroll';
import { ItemTypes } from '../../utils/constants';

const ingridientsGroups = [
  { type: ItemTypes.BUN, title: 'Булки' },
  { type: ItemTypes.SAUCE, title: 'Соусы' },
  { type: ItemTypes.MAIN, title: 'Начинки' },
];

function BurgerIngredients({ ingridients }) {
  const dispatch = useDispatch();
  const { visible, currentItem } = useSelector((state) => state.ingridientDetails);
  const { bun, toppings } = useSelector((state) => state.orderItems);
  const [currentTab, setCurrentTab] = useState(ItemTypes.BUN);

  const containerRef = useRef(null);
  const targetsRefs = useRef({});

  useScroll(containerRef, targetsRefs, (entry) => setCurrentTab(entry.target.dataset.type));

  const ingridientsByGroups = useMemo(
    () =>
      ingridients.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
      }, {}),
    [ingridients]
  );

  const counts = useMemo(
    () =>
      [bun, bun, ...toppings].reduce((acc, item) => {
        if (item) acc[item._id] ? (acc[item._id] += 1) : (acc[item._id] = 1);
        return acc;
      }, {}),
    [bun, toppings]
  );

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

  const handleOpenModal = (item) => () => {
    dispatch(setCurrentItem(item));
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentItem());
  };

  return (
    <section className={cn(styles.section, 'p-5')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails item={currentItem} />
        </Modal>
      )}

      <h1 className={cn('text', 'text_type_main-large', 'mt-5', 'mb-5')}>Соберите бургер</h1>

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
              {ingridientsByGroups[type].map((item) => {
                return (
                  <IngridientCard
                    key={item._id}
                    count={counts[item._id]}
                    item={item}
                    handleOpenModal={handleOpenModal}
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

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};

export default BurgerIngredients;
