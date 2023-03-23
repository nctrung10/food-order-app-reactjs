import React, { useState, useEffect } from 'react';

const AppContext = React.createContext({
  isOpenCart: false,
  totalQuantity: 0,
  totalPrice: 0,
  addedItem: [],
  storeItem: () => {},
  onOpen: () => {},
  onHide: () => {},
  onPlusItem: () => {},
  onRemoveItem: () => {},
  onDone: () => {},
});

export const AppContextProvider = props => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addedItem, setAddedItem] = useState([]);

  // Calculating then Show total quantity & price in cart
  useEffect(() => {
    const sumQuantity = cartQuantity.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setTotalQuantity(sumQuantity);

    const sumPrice = cartPrice.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    //const newSumPrice = Math.round(sumPrice * 100) / 100;
    setTotalPrice(sumPrice);
  }, [cartQuantity, cartPrice]);

  // For the change of items in cart (maybe not good for performance)
  useEffect(() => {
    if (addedItem.length === 0 && totalQuantity === 0) {
      setTotalQuantity(0);
      setTotalPrice(0);
      setCartQuantity([]);
      setCartPrice([]);
    }
  }, [addedItem, totalQuantity]);

  // Add items to cart
  const storeHandler = (item) => {
    setCartQuantity(prevQuantity => [
      ...prevQuantity,
      item.quantity,
    ]);

    setCartPrice(prevPrice => [
      ...prevPrice,
      item.totalPrice,
    ]);

    setAddedItem((prevValue) => {
      const newData = [...prevValue];
      const index = prevValue.findIndex(({ id }) => id === item.id);

      // if an item is exist, then only update the amount of that item
      if (index !== -1) {
        newData[index] = { ...newData[index], amount: item.quantity + newData[index].amount };
      }

      return index !== -1 ? [
        ...newData
      ] : [
        ...newData,
        { id: item.id, name: item.name, price: item.price, amount: item.quantity },
      ];
    });
  };

  // Handling the modal
  const openModalHandler = () => setIsOpenCart(true);
  const hideModalHandler = () => setIsOpenCart(false);
  
  // Remove item in cart
  const removeItemHandler = (item) => {
    const newAmount = item.amount - 1;

    if (newAmount === 0) {
      // console.log('new amount = 0');
      setAddedItem(prevItem => prevItem.filter(({ id }) => id !== item.id));
    } else {
      // console.log('new amount != 0');
      setAddedItem(prevItem => {
        const newData = [...prevItem];
        const index = prevItem.findIndex(({ id }) => id === item.id);
        newData[index] = { ...newData[index], amount: newAmount };

        return newData;
      });
    }
    // console.log('Handle total price & quantity');
    setTotalQuantity(prevValue => prevValue - 1);
    setTotalPrice(prevTotal => prevTotal - item.price);
  };

  // Plus item in cart
  const plusItemHandler = (item) => {
    const newAmount = item.amount + 1;
    setAddedItem(prevItem => {
      const newData = [...prevItem];
      const index = prevItem.findIndex(({ id }) => id === item.id);
      newData[index] = { ...newData[index], amount: newAmount };

      return newData;
    });
    setTotalQuantity(prevValue => prevValue + 1);
    setTotalPrice(prevTotal => prevTotal + item.price);
  };

  const orderHandler = () => {
    setAddedItem([]);
    setTotalQuantity(0);
    setCartQuantity([]);
    setTotalPrice(0);
    setCartPrice([]);
  };

  return (
    <AppContext.Provider
      value={{
        isOpenCart: isOpenCart,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
        addedItem: addedItem,
        storeItem: storeHandler,
        onOpen: openModalHandler,
        onHide: hideModalHandler,
        onPlusItem: plusItemHandler,
        onRemoveItem: removeItemHandler,
        onDone: orderHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;

