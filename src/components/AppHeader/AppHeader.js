import React from 'react';
// import PropTypes from 'prop-types';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

function AppHeader(props) {
  return (
    <header className={styles.header}>
      <div className={`${styles.container}`}>
        <nav className={styles.menu}>
          <a href='/' className={styles.active}>
            <BurgerIcon type='primary' />
            <span>Конструктор</span>
          </a>
          <a href='/'>
            <ListIcon type='primary' />
            <span>Лента заказов</span>
          </a>
        </nav>
        <Logo />
        <a href='/'>
          <ProfileIcon type='primary' />
          <span>Личнный кабинет</span>
        </a>
      </div>
    </header>
  );
}

AppHeader.propTypes = {};

export default AppHeader;
