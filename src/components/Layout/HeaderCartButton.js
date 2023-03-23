import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/app-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  const appCtx = useContext(AppContext);
  const [isQuantityChange, setIsQuantityChange] = useState(false);

  //Handle animation for the cart button
  useEffect(() => {
    if (appCtx.totalQuantity) {
      setIsQuantityChange(true);
    }

    setTimeout(() => {
      setIsQuantityChange(false);
    }, 500);
  }, [appCtx.totalQuantity]);

  return (
    <button 
      className={`${classes.button} ${
        isQuantityChange ? classes.bump : ''
      }`} 
      onClick={appCtx.onOpen}
    >
      <span className={classes.icon}><CartIcon /></span>
      <span>Your cart</span>
      <span className={classes.badge}>
        {appCtx.totalQuantity}
      </span>
    </button>
  );
};

export default HeaderCartButton;