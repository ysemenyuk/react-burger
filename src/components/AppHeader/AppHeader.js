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
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div>
            <BurgerIcon type='primary' />
            Конструктор
          </div>
          <div>
            <ListIcon type='primary' />
            Лента заказов
          </div>
        </nav>
        <Logo />
        <div>
          <ProfileIcon type='primary' />
          Личнный кабинет
        </div>
      </div>
    </header>
  );
}

AppHeader.propTypes = {};

export default AppHeader;
