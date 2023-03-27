import { useContext, useEffect, useState } from 'react';

import CartContext from '../../context/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  const [quantityIsChange, setQuantityIsChange] = useState(false);

  const { addedItems } = cartCtx;

  const totalQuantity = addedItems.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  //Handle animation for the cart button
  useEffect(() => {
    if (addedItems) {
      setQuantityIsChange(true);
    }

    const timer = setTimeout(() => {
      setQuantityIsChange(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [addedItems]);

  return (
    <button
      className={`${classes.button} ${quantityIsChange ? classes.bump : ''}`}
      onClick={props.onOpen}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;