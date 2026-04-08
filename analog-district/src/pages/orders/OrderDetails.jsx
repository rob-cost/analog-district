import axios from "axios";
import dayjs from "dayjs";

import { NavLink } from "react-router";
import { Fragment } from "react";
import buyAgainIcon from "../../assets/images/icons/buy-again.png";

export function OrderDetails({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map(orderProduct => {
        const addToCart = async () => {
          await axios.post("/api/cart-items", {
            productId: orderProduct.productId,
            quantity: 1,
          });
          loadCart();
        };
        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM DD")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <NavLink to={`/tracking/${order.id}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </NavLink>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
