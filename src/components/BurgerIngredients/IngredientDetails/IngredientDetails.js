import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './IngredientDetails.module.css';
import ingridientPropTypes from '../../../types/ingridientPropTypes.js';

function IngredientDetails({ item }) {
  return (
    <section className={cn(styles.container)}>
      <h2 className={cn(styles.title, 'pt-3', 'pb-3', 'text text_type_main-large')}>
        Детали ингредиента
      </h2>
      <img src={item.image_large} alt={item.name}></img>
      <span className={cn(styles.name, 'text_type_main-medium', 'pb-8')}>{item.name}</span>
      <ul className={cn(styles.props, 'text_type_main-default', 'text_color_inactive')}>
        <li>
          Калории, ккал
          <span className={cn('text_type_digits-default', 'mt-4')}>{item.calories}</span>
        </li>
        <li>
          Белки, г<span className={cn('text_type_digits-default', 'mt-4')}>{item.proteins}</span>
        </li>
        <li>
          Жиры, г <span className={cn('text_type_digits-default', 'mt-4')}>{item.fat}</span>
        </li>
        <li>
          Углеводы, г
          <span className={cn('text_type_digits-default', 'mt-4')}>{item.carbohydrates}</span>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = { item: ingridientPropTypes.isRequired };

export default IngredientDetails;
