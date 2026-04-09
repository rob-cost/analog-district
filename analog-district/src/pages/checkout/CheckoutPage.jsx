import axios from "axios";

import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const updatePaymentSummary = async () => {
      try {
        let response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error("Error fetching payment summary:", error);
      }
    };

    updatePaymentSummary();
  }, [cart]);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        let response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime",
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("Error fetching delivery options:", error);
      }
    };
    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
