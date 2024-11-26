import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import "./Style.css";
import { CartState } from "../Context/Context";
import { ACTIONS } from "../Context/reducer";
const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  // console.log(cart);

  return (
    <>
      <div className="products">
        <Card>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              &#8377;<span> {product.price.split(".")[0]}</span>
              {product.fastDelivery ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 dyas Delivery</div>
              )}
              <Rating rating={product.ratings} />
            </Card.Subtitle>
            {cart?.some((item) => item.id === product.id) ? (
              <Button
                variant="danger"
                onClick={() => {
                  dispatch({
                    type: ACTIONS.REMOVE_FROM_CART,
                    payload: { id: product.id },
                  });
                }}
              >
                Remove from Cart
              </Button>
            ) : (
              <>
                {!product.inStock ? (
                  <Button disabled variant="danger">
                    Out of stock
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: ACTIONS.ADD_TO_CART,
                        payload: product,
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
