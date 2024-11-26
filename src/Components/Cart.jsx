import React, { useEffect, useState } from "react";
import "./Style.css";
import { CartState } from "../Context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";
import { ACTIONS } from "../Context/reducer";
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart?.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  return (
    <>
      <div className="home">
        <div className="productContainer cartContainer">
          <ListGroup>
            {cart?.map((item) => {
              return (
                <>
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={2}>
                        <span>{item.name}</span>
                      </Col>
                      <Col md={2}>&#8377;{item.price}</Col>
                      <Col md={2}>
                        <Rating rating={item.ratings} />
                      </Col>

                      <Col md={2}>
                        <Form.Group>
                          <Form.Label>Qty :</Form.Label>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch({
                                type: ACTIONS.CHANGE_CART_QUANTITY,
                                payload: {
                                  id: item.id,
                                  qty: e.target.value,
                                },
                              })
                            }
                          >
                            {[...Array(item.inStock).keys()]?.map((i) => (
                              <option key={i + 1}>{i + 1}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: ACTIONS.REMOVE_FROM_CART,
                              payload: { id: item.id },
                            })
                          }
                        >
                          <AiFillDelete size="20px" />
                        </Button>
                      </Col>
                    </Row>
                    <Col style={{ textAlign: "end" }}>
                      <span>Sub Toatl : </span>

                      <span style={{ fontWeight: "bold" }}>
                        &#8377;
                        {item.qty * item.price.split(",")[0]}
                      </span>
                    </Col>
                  </ListGroup.Item>
                </>
              );
            })}
          </ListGroup>
        </div>
        <div className="filters summary">
          <span className="title">Subtotal ({cart?.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: "20px" }}>
            Total : &#8377;{total}
          </span>
          <Button type="button" disabled={cart?.length === 0}>
            Proceed to CheckOut
          </Button>
          <Button style={{ marginTop: "10px" }}>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
