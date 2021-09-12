import cn from 'classnames';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderLink from './HeaderLink/HeaderLink';

import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={cn(styles.container, 'pt-4', 'pb-4')}>
        <HeaderLink href={'/'} active={true}>
          <BurgerIcon /> Конструктор
        </HeaderLink>

        <HeaderLink href={'/'} active={false}>
          <ListIcon /> Лента заказов
        </HeaderLink>

        <Logo />

        <HeaderLink href={'/'} active={false} style={{ marginLeft: 'auto' }}>
          <ProfileIcon /> Личный кабинет
        </HeaderLink>
      </nav>
    </header>
  );
}

export default AppHeader;
