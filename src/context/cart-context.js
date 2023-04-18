import React, { useState } from 'react';

const CartContext = React.createContext({
  addedItems: [],
  totalPrice: 0,
  storeItem: (item) => {},
  plusItem: (item) => {},
  removeItem: (item) => {},
  clearCart: () => {},
});

export const CartContextProvider = props => {
  const [addedItems, setAddedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Add items to cart
  const storeHandler = (item) => {
    setTotalPrice(prevPrice => prevPrice + item.totalPrice)

    setAddedItems((prevValue) => {
      const existingItemIndex = prevValue.findIndex(({ id }) => id === item.id);
      const currentItem = [...prevValue];

      // if an item is exist, then only update the amount of that item
      if (existingItemIndex !== -1) {
        currentItem[existingItemIndex] = { 
          ...currentItem[existingItemIndex], 
          amount: currentItem[existingItemIndex].amount + item.quantity 
        };
      }

      return existingItemIndex !== -1 ? [
        ...currentItem
      ] : [
        ...currentItem,
        { id: item.id, name: item.name, price: item.price, amount: item.quantity },
      ];
    });
  };

  // Remove item (- 1) in cart
  const removeItemHandler = (item) => {
    const newAmount = item.amount - 1;

    //if the quantity of the item is 0, then remove entirely that item from the cart
    //otherwise decrease the item by 1
    if (newAmount === 0) {
      setAddedItems(prevItem => prevItem.filter(({ id }) => id !== item.id));
    } else {
      setAddedItems(prevItem => {
        const existingItemIndex = prevItem.findIndex(({ id }) => id === item.id);
        const currentItem = [...prevItem];
        currentItem[existingItemIndex] = { ...currentItem[existingItemIndex], amount: newAmount };

        return currentItem;
      });
    }

    //If the cart is empty (Refactored)
    setTotalPrice(prevTotal => {
      const newTotalPrice = prevTotal - item.price;
      return newTotalPrice <= 0 ? 0 : newTotalPrice;
    });
  };

  // Plus item (+ 1) in cart
  const plusItemHandler = (item) => {
    const newAmount = item.amount + 1;
    
    setAddedItems(prevItem => {
      const existingItemIndex = prevItem.findIndex(({ id }) => id === item.id);
      const currentItem = [...prevItem];
      currentItem[existingItemIndex] = { ...currentItem[existingItemIndex], amount: newAmount };

      return currentItem;
    });

    setTotalPrice(prevTotal => prevTotal + item.price);
  };

  // Clear items in cart
  const clearCartHandler = () => {
    setAddedItems([]);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{
        addedItems: addedItems,
        totalPrice: totalPrice,
        storeItem: storeHandler,
        removeItem: removeItemHandler,
        plusItem: plusItemHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

