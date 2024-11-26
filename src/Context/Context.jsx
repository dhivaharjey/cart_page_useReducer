import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, filterReducer } from "./reducer";

export const Cart = createContext();

faker.seed(99);
const Context = ({ children }) => {
  const products = [...Array(20)].map(() => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),

      image: faker.image.urlLoremFlickr({ category: "product" }),
      inStock: faker.helpers.arrayElement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    };
  });

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    // byStock: true,
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  return (
    <Cart.Provider value={{ state, dispatch, filterState, filterDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
