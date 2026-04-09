import axios from "axios";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { Header } from "../../components/Header";
import { ProductsGrids } from "./ProductsGrid";

import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const urlPath = search
          ? `/api/products?search=${search}`
          : "/api/products";
        const response = await axios.get(urlPath);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchHomeData();
  }, [search]);

  return (
    <>
      <title>Analog District</title>
      <Header cart={cart} searchQuery={search} />
      <div className="home-page">
        <ProductsGrids products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
