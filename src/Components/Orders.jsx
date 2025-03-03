import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { CartState } from "../Context/Context";
const Orders = () => {
  const { orders, recentOrder } = CartState();
  const navigate = useNavigate();
  // console.log(orders);
  const totalAmount = recentOrder?.reduce(
    (acc, item) => acc + (item.qty || 1) * Number(item.price),
    0
  );
  // console.log(recentOrder);

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        {orders?.length > 0 && (
          <>
            <h2 className="text-center text-success">🎉 Order Confirmed!</h2>
            <h2 className="text-center text-success">
              Recently Ordered product Details
            </h2>
            <p className="text-center">Thank you for your purchase.</p>
          </>
        )}
        {recentOrder.length > 0 ? (
          <>
            <ListGroup variant="flush">
              {recentOrder?.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
                  <Row className="w-100">
                    <Col xs={3} md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: "80px" }}
                      />
                    </Col>
                    <Col xs={9} md={4}>
                      <p className="mb-1 fw-bold">{item.name}</p>
                      <p className="mb-1">Price: ₹{item.price}</p>
                      <p className="mb-1">Quantity: {item.qty || 1}</p>
                    </Col>
                    <Col md={3} className="d-none d-md-block">
                      <p className="fw-bold">
                        Subtotal: ₹{(item.qty || 1) * item.price}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h3 className="mt-3 text-danger text-center">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </h3>
          </>
        ) : null}

        <h2 className="text-center text-success">Orders List</h2>
        {orders.length > 0 ? (
          <>
            <ListGroup variant="flush">
              {orders.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
                  <Row className="w-100">
                    <Col xs={3} md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: "80px" }}
                      />
                    </Col>
                    <Col xs={9} md={4}>
                      <p className="mb-1 fw-bold">{item.name}</p>
                      <p className="mb-1">Price: ₹{item.price}</p>
                      <p className="mb-1">Quantity: {item.qty || 1}</p>
                    </Col>
                    <Col md={3} className="d-none d-md-block">
                      <p className="fw-bold">
                        Subtotal: ₹{(item.qty || 1) * item.price}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <p className="text-danger text-center">No order details found.</p>
        )}
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate("/")}>
            🏠 Back to Home
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Orders;
