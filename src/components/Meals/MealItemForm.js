import React, { useState, useContext } from 'react';

import AppContext from '../../context/app-context';
import Input from '../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const appCtx = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const changeAmountHandler = ({ target }) => {
    setQuantity(target.value);
  };

  const addToCartHandler = (event) => {
    event.preventDefault();

    if (+quantity >= 1) {
      const dishInfo = {
        id: props.id,
        name: props.name,
        price: +props.price,
        totalPrice: props.price * quantity,
        quantity: +quantity,
      };

      appCtx.storeItem(dishInfo);
    } else {
      setQuantity(1);
    }
  };

  const inputObj = {
    type: 'number',
    id: `amount-${props.id}`,
    min: '1',
    max: '5',
    value: quantity,
    // defaultValue: 1,
    onChange: changeAmountHandler,
  };

  return (
    <form className={classes.form} onSubmit={addToCartHandler}>
      <Input 
        label="Amount"
        input={inputObj}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;