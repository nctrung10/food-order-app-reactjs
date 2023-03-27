import { useState } from 'react';

import Header from './components/Layout/Header';
import AvailableMeals from './components/Meals/AvailableMeals';
import MealsSummary from './components/Meals/MealsSummary';
import Cart from './components/Cart/Cart';
import { CartContextProvider } from './context/cart-context';

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  // Handling the modal
  const openModalHandler = () => setCartIsOpen(true);
  const hideModalHandler = () => setCartIsOpen(false);

  return (
    <CartContextProvider>
      <Header onOpenCart={openModalHandler} />
      {cartIsOpen && <Cart onHideCart={hideModalHandler} />}

      <main>
        <MealsSummary />
        <AvailableMeals />
      </main>
    </CartContextProvider>
  );
}

export default App;
