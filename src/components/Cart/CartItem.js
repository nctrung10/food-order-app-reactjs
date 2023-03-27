import React, { useContext } from 'react';

import CartContext from '../../context/cart-context';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span> {/* Handling amount when clicking the below button */}
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={() => {cartCtx.onRemoveItem(props)}}>-</button>
        <button onClick={() => {cartCtx.onPlusItem(props)}}>+</button>
      </div>
    </li>
  );
};

export default CartItem;