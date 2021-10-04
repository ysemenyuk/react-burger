import cn from 'classnames';
import styles from './AppHeader.module.css';

import { useLocation, Link } from 'react-router-dom';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLink from './HeaderLink/HeaderLink';

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={cn(styles.container)}>
        <HeaderLink to={'/'} active={pathname === '/'}>
          <BurgerIcon /> Конструктор
        </HeaderLink>

        <HeaderLink to={'/feed'} active={pathname === '/feed'}>
          <ListIcon /> Лента заказов
        </HeaderLink>

        <Link to={'/'} className={styles.logo}>
          <Logo />
        </Link>

        <HeaderLink
          to={'/profile'}
          active={pathname === '/profile'}
          style={{ marginLeft: 'auto' }}
        >
          <ProfileIcon /> Личный кабинет
        </HeaderLink>
      </nav>
    </header>
  );
}

export default AppHeader;
