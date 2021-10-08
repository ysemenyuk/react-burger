import cn from 'classnames';
import styles from './IngredientDetails.module.css';

import { FC } from 'react';
import { TIngredient } from '../../types/types';

interface IProps {
  ingredient: TIngredient;
}

const IngredientDetails: FC<IProps> = ({ ingredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <section className={cn(styles.container)}>
      <img src={image_large} alt={name}></img>
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
};

export default IngredientDetails;
