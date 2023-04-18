import { useState } from "react";

const useInput = (validateValue = () => {}) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue); // check boolean via the function handle conditions
  const hasError = !valueIsValid && touched; // show the error if the value is invalid

  const onChange = event => {
    setEnteredValue(event.target.value);
  };

  const onBlur = event => {
    setTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onChange,
    onBlur,
    reset
  };
};

export default useInput;