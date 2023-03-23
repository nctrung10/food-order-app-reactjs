import React, { useContext } from 'react';

import classes from './Cart.module.css';
import AppContext from '../../context/app-context';
import CartItem from './CartItem';

const Cart = () => {
  const appCtx = useContext(AppContext);
  const cartItems = appCtx.addedItem.map(item => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
    />
  ));

  // Total price of items in cart
  const totalPrice = `$${appCtx.totalPrice.toFixed(2)}`;

  // Ordering items in cart
  const orderHandler = () => {
    alert('Order successfully!');
    appCtx.onHide();
    appCtx.onDone();
  };

  return (
    <ul className={classes['cart-items']}>
      {appCtx.addedItem.length !== 0 ? cartItems : (<p>No items in your cart.</p>)}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>

      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={appCtx.onHide}
        >
          Close
        </button>
        <button
          className={classes.button}
          onClick={orderHandler}
          disabled={appCtx.addedItem.length === 0}
        >
          Order
        </button>
      </div>
    </ul>
  );
};

export default Cart;