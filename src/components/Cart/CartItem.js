import React, { useContext } from 'react';

import AppContext from '../../context/app-context';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const appCtx = useContext(AppContext);

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>x {props.amount}</span> {/* Handling amount when clicking the below button */}
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={() => {appCtx.onRemoveItem(props)}}>-</button>
        <button onClick={() => {appCtx.onPlusItem(props)}}>+</button>
      </div>
    </li>
  );
};

export default CartItem;