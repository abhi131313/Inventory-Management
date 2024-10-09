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

  let totalStoreValue = 0;
  products.forEach((product, index) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(product.quantity);

    if (isNaN(price) || isNaN(quantity)) {
      console.error(
        `Invalid price or quantity for product at index ${index}:`,
        product
      );
    } else {
      const productValue = price * quantity;
      totalStoreValue += productValue;
      console.log(
        `Product ${index}: Price=${price}, Quantity=${quantity}, Value=${productValue}`
      );
    }
  });

  console.log("Final Total Store Value:", totalStoreValue);

  const outOfStock = products.filter(
    (product) => parseInt(product.quantity) === 0
  ).length;
  const categories = new Set(products.map((product) => product.category)).size;

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
