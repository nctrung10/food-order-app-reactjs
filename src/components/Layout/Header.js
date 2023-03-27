import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImg from '../../assets/img/meals.jpg';
import classes from './Header.module.css';

const Header = props => {
  return (
    <header>
      <div className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onOpen={props.onOpenCart} />
      </div>

      <div className={classes['main-image']}>
        <img src={mealsImg} alt="main-img" />
      </div>
    </header>
  );
};

export default Header;