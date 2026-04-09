import axios from "axios";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
