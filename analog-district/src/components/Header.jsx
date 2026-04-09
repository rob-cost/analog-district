import "./Header.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import logoWhite from "../assets/images/logo-white.png";
import logoWhiteMobile from "../assets/images/mobile-logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";

export function Header({ cart, search }) {
  const [inputText, setInputText] = useState(search || "");
  const navigate = useNavigate();

  let totalQuantity = 0;

  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
  });

  useEffect(() => {
    setInputText(search || "");
  }, [search]);

  const handleSearchInput = e => {
    setInputText(e.target.value);
  };

  const searchItems = () => {
    navigate(`/?search=${inputText}`);
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={logoWhiteMobile} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={inputText}
          onChange={handleSearchInput}
          onKeyDown={e => {
            if (e.key == "Enter") searchItems();
          }}
        />

        <button className="search-button" onClick={searchItems}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
