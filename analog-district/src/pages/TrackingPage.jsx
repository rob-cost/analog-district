import dayjs from "dayjs";
import axios from "axios";

import { Header } from "../components/Header";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const [currentOrder, setCurrentOrder] = useState(null);
  const params = useParams();
  const orderId = params.orderId;
  const productId = params.productId;

  useEffect(() => {
    const fetchOrderProducts = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setCurrentOrder(response.data);
    };

    fetchOrderProducts();
  }, orderId);

  console.log(currentOrder);

  if (!currentOrder) {
    return null;
  }

  const currentProduct = currentOrder.products.find(product => {
    return product.productId === productId;
  });

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(currentProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D",
            )}
          </div>

          <div className="product-info">{currentProduct.product.name}</div>

          <div className="product-info">
            Quantity: {currentProduct.quantity}
          </div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
