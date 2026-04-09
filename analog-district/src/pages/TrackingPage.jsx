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

  // Get the order details for the current order and product
  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const response = await axios.get(
          `/api/orders/${orderId}?expand=products`,
        );
        setCurrentOrder(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderProducts();
  }, [orderId]);

  if (!currentOrder) {
    return null;
  }

  // Find the current product in the order's products array
  const currentProduct = currentOrder.products.find(product => {
    return product.productId === productId;
  });

  if (!currentProduct) {
    return null;
  }

  // Formatted delivery date
  const formattedDate = dayjs(currentProduct.estimatedDeliveryTimeMs).format(
    "dddd, MMMM D",
  );

  // Calculate the progress of the delivery
  const totalDeliveryTimeMs =
    currentProduct.estimatedDeliveryTimeMs - currentOrder.orderTimeMs;
  console.log(totalDeliveryTimeMs);

  const timePassedMs = dayjs().valueOf() - currentOrder.orderTimeMs;
  console.log(timePassedMs);

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  console.log(deliveryPercent);
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

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
            {deliveryPercent >= 100 ? "Delivered on " : "Arriving on "}
            {formattedDate}
          </div>

          <div className="product-info">{currentProduct.product.name}</div>

          <div className="product-info">
            Quantity: {currentProduct.quantity}
          </div>

          <img className="product-image" src={currentProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
