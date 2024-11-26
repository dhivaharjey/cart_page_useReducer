import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../Context/Context";
import { ACTIONS } from "../Context/reducer";

const Filters = () => {
  const {
    filterState: { sort, byStock, byFastDelivery, byRating, searchQuery },
    filterDispatch,
  } = CartState();

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="PRICE : Low to High"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            filterDispatch({
              type: ACTIONS.SORT_BY_PRICE,
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="PRICE :  High to Low"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            filterDispatch({
              type: ACTIONS.SORT_BY_PRICE,
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            filterDispatch({
              type: ACTIONS.FILTER_BY_STOCK,
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            filterDispatch({
              type: ACTIONS.FILTER_BY_DELIVERY,
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating :</label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            filterDispatch({ type: ACTIONS.FILTER_BY_RATING, payload: i + 1 })
          }
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          filterDispatch({
            type: ACTIONS.CLEAR_FILTER,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
