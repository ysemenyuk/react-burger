import React from 'react';
// import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

function AppHeader(props) {

  const linkItemClass = cs(styles.item, 'm-4', 'text_type_main-default', 'text_color_inactive')
  const linkItemActiveClass = cs(styles.item, 'm-4', 'text_type_main-default')

  return (
    <header className={styles.header}>
      <div className={cs(styles.container, 'pt-4', 'pb-4')}>
        <nav className={styles.menu}>
          <a href='/' className={linkItemActiveClass}>
            <BurgerIcon type='primary' />
            Конструктор
          </a>
          <a href='/' className={linkItemClass}>
            <ListIcon type='secondary' />
            Лента заказов
          </a>
        </nav>
        <Logo />
        <a href='/' className={linkItemClass}>
          <ProfileIcon type='secondary' />
          Личнный кабинет
        </a>
      </div>
    </header>
  );
}

AppHeader.propTypes = {};

export default AppHeader;
