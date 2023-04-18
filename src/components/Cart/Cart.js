import React, { useContext, useState } from 'react';

import classes from './Cart.module.css';
import CartContext from '../../context/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { sendRequest: fetchSubmitOrder } = useHttp();

  const cartCtx = useContext(CartContext);

  const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
  const hasItems = cartCtx.addedItems.length > 0;

  // Plus (+1) item in cart
  const plusItemHandler = item => {
    cartCtx.plusItem(item);
  };

  // Remove (-1) item in cart
  const removeItemHandler = item => {
    cartCtx.removeItem(item);
  };

  // Order Button clicked
  const orderHandler = () => {
    setIsCheckout(true);
  };

  // Submit cart items to the http server
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetchSubmitOrder({
      url: 'https://react-food-order-app-1099-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
      method: 'POST',
      body: {
        orderedItem: cartCtx.addedItems,
        user: userData
      }
    });
    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.addedItems.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemHandler.bind(null, item)}
          onPlus={plusItemHandler.bind(null, item)}
        />
      ))}
      {!hasItems && <p style={{ marginBottom: 0 }}>No items in your cart.</p>}
    </ul>
  );

  const modalCartActions = (
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
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      {(!isCheckout || !hasItems) && modalCartActions}
      {(isCheckout && hasItems) && <Checkout onCancel={props.onHideCart} onSubmit={submitOrderHandler} />}
    </React.Fragment>
  );

  const orderIsSubmittingContent = <p>Sending order data....</p>;

  const orderDidSubmitedContent = (
    <React.Fragment>
      <p>Sent successfully the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>Close</button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHide={props.onHideCart}>
      {(!isSubmitting && !didSubmit) && cartModalContent}
      {isSubmitting && orderIsSubmittingContent}
      {(!isSubmitting && didSubmit) && orderDidSubmitedContent}
    </Modal>
  );
};

export default Cart;