import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './IngredientDetails.module.css';
import itemDataPropTypes from '../itemDataPropTypes.js';

function IngredientDetails(props) {
  return (
    <section className={cn(styles.container)}>
      <img src={props.item.image_large} alt={props.item.name}></img>
      <span className={cn(styles.name, 'text_type_main-medium', 'pb-8')}>{props.item.name}</span>
      <ul className={cn(styles.props, 'text_type_main-default', 'text_color_inactive')}>
        <li>
          Калории, ккал
          <span className={cn('text_type_digits-default', 'mt-4')}>{props.item.calories}</span>
        </li>
        <li>
          Белки, г
          <span className={cn('text_type_digits-default', 'mt-4')}>{props.item.proteins}</span>
        </li>
        <li>
          Жиры, г <span className={cn('text_type_digits-default', 'mt-4')}>{props.item.fat}</span>
        </li>
        <li>
          Углеводы, г
          <span className={cn('text_type_digits-default', 'mt-4')}>
            {props.item.carbohydrates}
          </span>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = { itemDataPropTypes };

export default IngredientDetails;
