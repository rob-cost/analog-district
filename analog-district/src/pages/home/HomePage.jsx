import axios from "axios";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrids } from "./ProductsGrid";

import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <title>Analog District</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrids products={products} />
      </div>
    </>
  );
}
