import React from 'react';
// import cs from 'classnames';

import styles from './App.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import data from '../../utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.container}>
          <BurgerConstructor data={data} />
          <BurgerIngredients data={data} />
        </div>
      </main>
    </>
  );
}

export default App;
