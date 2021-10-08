import cn from 'classnames';
import styles from './BunCard.module.css';

import { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../types/types';

interface IProps {
  item: TIngredient;
  top?: boolean;
}

const BunCard: FC<IProps> = ({ item, top }) => {
  const { name, price, image } = item;
  return (
    <div className={cn(styles.bun)}>
      <ConstructorElement
        type={top ? 'top' : 'bottom'}
        isLocked={true}
        text={`${name} ${top ? '(верх)' : '(низ)'}`}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

export default BunCard;
