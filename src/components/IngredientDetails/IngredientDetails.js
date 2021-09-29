import cn from 'classnames';
import styles from './IngredientDetails.module.css';

import ingridientPropTypes from '../../utils/ingridientPropTypes';

function IngredientDetails({ item }) {
  const { image_large, name, calories, proteins, fat, carbohydrates } = item;

  return (
    <section className={cn(styles.container)}>
      <img src={image_large} alt={item.name}></img>
      <span className={cn(styles.name, 'text_type_main-medium')}>{name}</span>
      <ul className={cn(styles.props, 'text_type_main-default', 'text_color_inactive')}>
        <li>
          Калории, ккал
          <span className={cn('text_type_digits-default')}>{calories}</span>
        </li>
        <li>
          Белки, г<span className={cn('text_type_digits-default')}>{proteins}</span>
        </li>
        <li>
          Жиры, г <span className={cn('text_type_digits-default')}>{fat}</span>
        </li>
        <li>
          Углеводы, г<span className={cn('text_type_digits-default')}>{carbohydrates}</span>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = { item: ingridientPropTypes.isRequired };

export default IngredientDetails;
