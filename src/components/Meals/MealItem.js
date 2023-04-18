import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div id={props.id}>
        <h3>{props.name}</h3>
        <span className={classes.description}>{props.description}</span>
        <span className={classes.price}>{price}</span>
      </div>
      
      <div>
        <MealItemForm 
          id={props.id}
          name={props.name}
          price={props.price}
        />
      </div>
    </li>
  );
};

export default MealItem;