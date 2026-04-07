import dayjs from "dayjs";

import { NavLink } from "react-router";
import { Fragment } from "react";
import buyAgainIcon from "../../assets/images/icons/buy-again.png";

export function OrderDetails({ order }) {
  return (
    <div className="order-details-grid">
      {order.products.map(orderProduct => {
        return (
          <Fragment key={orderProduct.productId}>
            {console.log(orderProduct)}
            {console.log(order)}
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
              <button className="buy-again-button button-primary">
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
