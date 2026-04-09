import { Link } from "react-router";
import "./CheckoutHeader.css";

import logo from "../../assets/images/logo.png";
import logoMobile from "../../assets/images/mobile-logo.png";
import checkoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;

  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src={logoMobile} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIcon} />
        </div>
      </div>
    </div>
  );
}
