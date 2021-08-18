import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

function AppHeader(props) {
  const linkItemClass = cn(styles.item, 'm-4', 'text_type_main-default', 'text_color_inactive');
  const linkItemActiveClass = cn(styles.item, 'm-4', 'text_type_main-default');

  return (
    <header className={styles.header}>
      <nav className={cn(styles.container, 'pt-4', 'pb-4')}>
        <ul className={styles.menu}>
          <li>
            <a href='/' className={linkItemActiveClass}>
              <BurgerIcon type='primary' />
              Конструктор
            </a>
          </li>
          <li>
            <a href='/' className={linkItemClass}>
              <ListIcon type='secondary' />
              Лента заказов
            </a>
          </li>
        </ul>
        <Logo />
        <div className={styles.loginLink}>
          <a href='/' className={linkItemClass}>
            <ProfileIcon type='secondary' />
            Личнный кабинет
          </a>
        </div>
      </nav>
    </header>
  );
}

// AppHeader.propTypes = {};

export default AppHeader;
