import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientsGroup from './IngridientsGroup/IngridientsGroup';
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

import styles from './BurgerIngredients.module.css';
import ingridientPropTypes from '../../types/ingridientPropTypes.js';

function BurgerIngredients({ ingridients }) {
  const mainTitleClass = cn('text', 'text_type_main-large', 'mt-5', 'mb-5');

  const buns = React.useMemo(
    () => ingridients.filter((item) => item.type === 'bun'),
    [ingridients]
  );

  const sauces = React.useMemo(
    () => ingridients.filter((item) => item.type === 'sauce'),
    [ingridients]
  );

  const mains = React.useMemo(
    () => ingridients.filter((item) => item.type === 'main'),
    [ingridients]
  );

  const [visible, setVisible] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const [currentTab, setCurrentTab] = React.useState('bun');

  const setCurrent = (tab) => {
    setCurrentTab(tab);
    const target = document.getElementById(tab);
    if (target && target.parentNode) {
      // target.scrollIntoView({ behavior: 'smooth' });
      target.parentNode.scrollTo({
        top: target.offsetTop - target.parentNode.offsetTop,
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

  return (
    <section className={cn(styles.section, 'p-5')}>
      {visible && (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails item={item} />
        </Modal>
      )}

      <h1 className={mainTitleClass}>Соберите бургер</h1>

      <div className={cn(styles.tabs, 'mb-10')}>
        <Tab value='bun' active={currentTab === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='sauce' active={currentTab === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='main' active={currentTab === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.itemsBox}>
        <IngridientsGroup
          ingridients={buns}
          anchor={'bun'}
          title={'Булки'}
          handleOpenModal={handleOpenModal}
        />
        <IngridientsGroup
          ingridients={sauces}
          anchor={'sauce'}
          title={'Соусы'}
          handleOpenModal={handleOpenModal}
        />
        <IngridientsGroup
          ingridients={mains}
          anchor={'main'}
          title={'Начинки'}
          handleOpenModal={handleOpenModal}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};

export default BurgerIngredients;
