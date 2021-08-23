import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsGroup from './IngridientsGroup/IngridientsGroup';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import styles from './BurgerIngredients.module.css';
import ingridientPropTypes from '../../types/ingridientPropTypes.js';

const ingridientsGroups = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
];

function BurgerIngredients({ ingridients }) {
  const ingridientsByGroups = React.useMemo(
    () =>
      ingridients.reduce((acc, ingridient) => {
        if (!acc[ingridient.type]) acc[ingridient.type] = [];
        acc[ingridient.type].push(ingridient);
        return acc;
      }, {}),
    [ingridients]
  );

  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [currentTab, setCurrentTab] = React.useState('bun');

  const setCurrent = (tab) => {
    setCurrentTab(tab);
    const target = document.getElementById(tab);
    const rootElement = document.getElementById('ingridientsList');
    if (target && target.parentNode) {
      rootElement.scrollTo({
        top: target.offsetTop - rootElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenModal = (item) => () => {
    setItem(item);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    const rootElement = document.getElementById('ingridientsList');
    const options = {
      root: rootElement,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentTab(entry.target.id);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.group');
    elements.forEach((i) => {
      observer.observe(i);
    });
  });

  return (
    <section className={cn(styles.section, 'p-5')}>
      {visible && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails item={item} />
        </Modal>
      )}

      <h1 className={cn('text', 'text_type_main-large', 'mt-5', 'mb-5')}>Соберите бургер</h1>

      <ul className={cn(styles.tabs, 'mb-10')}>
        {ingridientsGroups.map(({ type, title }) => (
          <li key={type}>
            <Tab value={type} active={currentTab === type} onClick={setCurrent}>
              {title}
            </Tab>
          </li>
        ))}
      </ul>

      <ul id={'ingridientsList'} className={styles.ingridientsList}>
        {ingridientsGroups.map(({ type, title }) => (
          <li key={type}>
            <h2 id={type} className={cn('group', 'text', 'text_type_main-medium', 'mb-2')}>
              {title}
            </h2>
            <IngridientsGroup
              ingridients={ingridientsByGroups[type]}
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
