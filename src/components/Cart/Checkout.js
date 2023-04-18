import useInput from '../../hooks/use-input';

import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const postalCodeValidation = value => value.trim() !== '' && !isNaN(value) && value.trim().length === 5;

const inputClasses = enteredInput => enteredInput ? `${classes.control} ${classes.invalid}` : classes.control;

const Checkout = props => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler
  } = useInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetInputHasError,
    onChange: streetChangeHandler,
    onBlur: streetBlurHandler
  } = useInput(isNotEmpty);

  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeInputHasError,
    onChange: postalCodeChangeHandler,
    onBlur: postalCodeBlurHandler
  } = useInput(postalCodeValidation);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityInputHasError,
    onChange: cityChangeHandler,
    onBlur: cityBlurHandler
  } = useInput(isNotEmpty);

  // Confirm user data
  const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = event => {
    event.preventDefault();
    
    if (!formIsValid) return;

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={inputClasses(nameInputHasError)}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <small>Please enter a valid name.</small>}
      </div>
      <div className={inputClasses(streetInputHasError)}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && <small>Please enter a valid street.</small>}
      </div>
      <div className={inputClasses(postalCodeInputHasError)}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeInputHasError && <small>Postal code must a number & 5 characters long.</small>}
      </div>
      <div className={inputClasses(cityInputHasError)}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputHasError && <small>Please enter a valid city.</small>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;