import React, { useContext, useRef } from 'react';

import CartContext from '../../context/cart-context';
import Input from '../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const cartCtx = useContext(CartContext);

  const quantityRef = useRef();

  // const [quantity, setQuantity] = useState(1);

  // const changeAmountHandler = ({ target }) => {
  //   setQuantity(target.value);
  // };

  // const addToCartHandler = (event) => {
  //   event.preventDefault();

  //   if (+quantity >= 1) {
  //     const dishInfo = {
  //       id: props.id,
  //       name: props.name,
  //       price: +props.price,
  //       quantity: +quantity,
  //       totalPrice: props.price * +quantity,
  //     };

  //     cartCtx.storeItem(dishInfo);
  //   } else {
  //     setQuantity(1);
  //   }
  // };

  const addToCartHandler = event => {
    event.preventDefault();

    const quantity = quantityRef.current.value;
    const quantityNumber = +quantity;

    if (quantityNumber >= 1) {
      const storedMeal = {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: quantityNumber,
        totalPrice: props.price * quantityNumber,
      };

      cartCtx.storeItem(storedMeal);
    } else {
      quantityRef.current.value = 1;
    }
  };

  const inputObj = {
    type: 'number',
    id: `amount-${props.id}`,
    min: '1',
    max: '5',
    defaultValue: '1',
    // value: quantity,
    // onChange: changeAmountHandler,
  };

  return (
    <form className={classes.form} onSubmit={addToCartHandler}>
      <Input
        ref={quantityRef}
        label="Amount"
        input={inputObj}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;