import React, { useContext } from 'react';

import Header from './components/Layout/Header';
import AvailableMeals from './components/Meals/AvailableMeals';
import MealsSummary from './components/Meals/MealsSummary';
import Modal from './components/UI/Modal/Modal';
import Cart from './components/Cart/Cart';
import AppContext from './context/app-context';

function App() {
  const ctx = useContext(AppContext);

  return (
    <React.Fragment>
      <Header />
      {ctx.isOpenCart && (
        <Modal>
          <Cart />
        </Modal>
      )}
      
      <main>
        <MealsSummary />
        <AvailableMeals />
      </main>
    </React.Fragment>
  );
}

export default App;
