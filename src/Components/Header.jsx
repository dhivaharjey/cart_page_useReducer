import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";

import { MdShoppingCart } from "react-icons/md";
import { BsBag, BsBagFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CartState } from "../Context/Context";
import { AiFillDelete } from "react-icons/ai";
import { ACTIONS } from "../Context/reducer";
import "./Style.css";
const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterDispatch,
    orders,
  } = CartState();
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        className="header"
        bg="dark"
        variant="dark"
        style={{ height: "80px", zIndex: 5, width: "100%" }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="Search a Product"
              className="m-auto"
              onChange={(e) =>
                filterDispatch({
                  type: ACTIONS.FILTER_BY_SEARCH,
                  payload: e.target.value,
                })
              }
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {/* <FaShoppingCart /> */}
                <MdShoppingCart size="25px" />
                <Badge bg="red" padding="10px">
                  {cart?.length}
                </Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: 350 }}>
                {cart?.length > 0 ? (
                  <>
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "5px 10px" }}>
                        Go to Cart
                      </Button>
                    </Link>
                    {cart?.map((item) => {
                      return (
                        <>
                          <span className="cart-item" key={item?.id}>
                            <img
                              className="cartItemImage"
                              src={item.image}
                              alt={item.name}
                            />
                            <div className="cartItemDetail">
                              <span>{item.name}</span>
                              <span>&#8377;{item.price.split(".")[0]}</span>
                            </div>
                            <AiFillDelete
                              size="20px"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch({
                                  type: ACTIONS.REMOVE_FROM_CART,
                                  payload: { id: item.id },
                                });
                              }}
                            />
                          </span>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <span style={{ padding: 10 }}>Cart is Empty!</span>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Navbar.Brand
            // style={{ cursor: "pointer" }}
            onClick={() => navigate("/orders")}
            className="order-icon"
          >
            <BsBagFill size={25} style={{ color: "#fff", cursor: "pointer" }} />
            {orders?.length > 0 && (
              <span className="orders">{orders?.length}</span>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
