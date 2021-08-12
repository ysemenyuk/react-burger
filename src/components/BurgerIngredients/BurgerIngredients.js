import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';

const itemDataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
});

function BurgerIngredients(props) {
  const loackedElement = props.data[0];

  return (
    <section className={cs(styles.section, 'p-5', 'pt-25')}>
      <div className={cs(styles.item, 'm-4')}>
        <ConstructorElement
          type={'top'}
          isLocked={true}
          text={loackedElement.name}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <div className={cs(styles.itemsBox, 'mb-4')}>
        {props.data.map((item) => (
          <div
            key={item._id}
            className={cs(styles.item, 'mb-4', 'ml-4', 'mr-2')}
          >
            <DragIcon type='primary' />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>

      <div className={cs(styles.item, 'm-4')}>
        <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={loackedElement.name}
          price={loackedElement.price}
          thumbnail={loackedElement.image}
        />
      </div>

      <div
        className={cs(styles.total, 'm-4', 'mt-10', 'text_type_digits-medium')}
      >
        <span className={'mr-10'}>
          8610
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemDataPropTypes),
};

export default BurgerIngredients;
