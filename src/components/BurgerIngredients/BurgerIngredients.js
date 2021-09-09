import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsGroupItems from './IngridientsGroup/IngridientsGroup';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import styles from './BurgerIngredients.module.css';
import ingridientPropTypes from '../../types/ingridientPropTypes.js';

import { setCurrentItem, resetCurrentItem } from '../../services/actions/ingridientsActions';
import { useScroll } from '../../hooks/useScroll';

const ingridientsGroups = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

function BurgerIngredients({ ingridients }) {
  const dispatch = useDispatch();
  const { visible, currentItem } = useSelector((state) => state.ingridientDetails);

  const ingridientsByGroups = React.useMemo(
    () =>
      ingridients.reduce((acc, ingridient) => {
        if (!acc[ingridient.type]) acc[ingridient.type] = [];
        acc[ingridient.type].push(ingridient);
        return acc;
      }, {}),
    [ingridients]
  );

  const [currentTab, setCurrentTab] = React.useState('bun');

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

  const containerRef = React.useRef(null);
  const targetsRefs = React.useRef({});

  useScroll(containerRef, targetsRefs, (entry) => setCurrentTab(entry.target.dataset.type));

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
            <IngridientsGroupItems
              type={type}
              title={title}
              items={ingridientsByGroups[type]}
              handleOpenModal={handleOpenModal}
            />
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
