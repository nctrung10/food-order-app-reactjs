import React, { useState, useEffect } from 'react';

import classes from './AvailableMeals.module.css';
import Card from '../../components/UI/Card/Card';
import MealItem from './MealItem';
import useHttp from '../../hooks/use-http';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  const transformMeals = meals => {
    const loadedMeals = Object.keys(meals).map(key => (
      <MealItem
        key={key}
        id={key}
        name={meals[key].name}
        description={meals[key].description}
        price={meals[key].price}
      />
    ));

    setMeals(loadedMeals);
  };

  useEffect(() => {
    fetchMeals(
      { url: 'https://react-food-order-app-1099-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json' },
      transformMeals
    );
  }, [fetchMeals]);

  let content = <h2>No meals found.</h2>;

  if (meals) {
    content = meals;
  }
  if (isLoading) {
    content = <p style={{ textAlign: 'center' }}>Loading meals....</p>;
  }
  if (error) {
    content = <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <Card className={classes.meals}>
      <ul>{content}</ul>
    </Card>
  );
};

export default AvailableMeals;