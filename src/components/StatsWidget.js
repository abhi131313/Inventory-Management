import React from "react";
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaExclamationCircle,
  FaDollarSign,
  FaShapes,
} from "react-icons/fa";
import "./StatsWidget.scss";

function StatsWidget() {
  const { products, status } = useSelector((state) => state.inventory);

  if (status === "loading") {
    return <div>Loading stats...</div>;
  }

  if (status === "failed") {
    return <div>Error loading stats. Please try again later.</div>;
  }

  const totalProducts = products.length;
  const totalStoreValue = products.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseInt(product.quantity) || 0;
    return sum + price * quantity;
  }, 1940);
  const outOfStock = products.filter(
    (product) => parseInt(product.quantity) === 0
  ).length;
  const categories = new Set(products.map((product) => product.category)).size;

  console.log("Products:", products); // Add this line for debugging
  console.log("Total Store Value:", totalStoreValue); // Add this line for debugging

  return (
    <div className="stats-widget">
      <div className="stat-item">
        <FaShoppingCart className="stat-icon" />
        <h3>Total Products</h3>
        <p>{totalProducts}</p>
      </div>
      <div className="stat-item">
        <FaDollarSign className="stat-icon" />
        <h3>Total Store Value</h3>
        <p>
          $
          {totalStoreValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="stat-item">
        <FaExclamationCircle className="stat-icon" />
        <h3>Out of Stock</h3>
        <p>{outOfStock}</p>
      </div>
      <div className="stat-item">
        <FaShapes className="stat-icon" />
        <h3>Number of Categories</h3>
        <p>{categories}</p>
      </div>
    </div>
  );
}

export default StatsWidget;
