import React, { useEffect, useState } from "react";
import "./Style.css";
import { CartState } from "../Context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import {
  AiFillDelete,
  AiOutlineHome,
  AiTwotoneQuestionCircle,
} from "react-icons/ai";
import { ACTIONS } from "../Context/reducer";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
    setOrders,
    orders,
    recentOrder,
    setRecentOrder,
  } = CartState();
  // console.log("cart", cart);

  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTotal(
      cart?.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  const handleSubmit = async (amount) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/order`,
        {
          amount,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res?.data);
      if (res) {
        handlePaymentVerify(res?.data);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.message || error?.message || "Someting went wrong"
      );
    } finally {
      setIsLoading(false);
    }
    // console.log(amount);
  };

  const handlePaymentVerify = async (order) => {
    const options = {
      key: import.meta.env.VITE_KEY_ID,

      amount: order?.amount || 500,
      currency: order?.currency || "INR",
      name: "JD CREATIONS",
      description: "Test Transaction",
      order_id: order?.id,
      handler: async function (response) {
        console.log(response);
        const payload = {
          razorpay_order_id: response?.razorpay_order_id,
          razorpay_payment_id: response?.razorpay_payment_id,
          razorpay_signature: response?.razorpay_signature,
        };
        let res;
        try {
          res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
            payload
          );
        } catch (error) {
          toast.error(
            error?.response?.message || error?.message || "Someting went wrong"
          );
        }

        if (response) {
          toast.success(res?.data?.message);
          setRecentOrder([...cart]);
          setOrders([...orders, ...cart]);
          dispatch({
            type: ACTIONS.CLEAR_CART,
          });
          navigate("/orders");
        }
      },
      prefill: {
        name: "jhon Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  return (
    <>
      {cart?.length === 0 ? (
        <div className="cart-empty">
          <AiTwotoneQuestionCircle size={200} />
          <p>Cart is Empty.... Add some products</p>
          <Link to="/" className="home-button">
            <AiOutlineHome size={50} />
          </Link>
        </div>
      ) : (
        <div className="home">
          <div className="productContainer cartContainer">
            <ListGroup>
              {cart?.map((item) => {
                return (
                  <>
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
            <Button
              type="button"
              disabled={cart?.length === 0}
              onClick={() => handleSubmit(total)}
            >
              {isLoading ? "Loading... " : "Proceed to CheckOut"}
            </Button>
            <Button style={{ marginTop: "10px" }} onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
