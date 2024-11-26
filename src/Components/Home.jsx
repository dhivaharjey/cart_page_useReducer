import React from "react";
import { CartState } from "../Context/Context";
import SingleProduct from "./SingleProduct";
import "./Style.css";
import Filters from "./Filters";
const Home = () => {
  const {
    state: { products },
    filterState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }
    // if (byStock) {
    //   sortedProducts = sortedProducts.filter((item) => item.inStock === 0);
    // }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (item) => item.ratings >= byRating
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };
  return (
    <>
      <div className="home">
        <Filters />
        <div className="productContainer">
          {transformProducts().map((prod) => {
            return <SingleProduct product={prod} key={prod.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
