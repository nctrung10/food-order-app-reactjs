import React, { useContext } from 'react';

import classes from './Cart.module.css';
import CartContext from '../../context/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  // Total price of items in cart
  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.addedItems.length > 0;

  const cartItems = cartCtx.addedItems.map(item => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
    />
  ));

  // Ordering items in cart
  const orderHandler = () => {
    alert('Order successfully!');
    props.onHideCart();
    cartCtx.onDone();
  };

  return (
    <Modal onHide={props.onHideCart}>
      <ul className={classes['cart-items']}>
        {hasItems ? cartItems : (<p>No items in your cart.</p>)}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalPrice}</span>
        </div>

        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      </ul>
    </Modal >
  );
};

export default Cart;