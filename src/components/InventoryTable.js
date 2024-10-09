import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, toggleProductDisabled } from "../store/inventorySlice";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import "./InventoryTable.scss";

function InventoryTable() {
  const dispatch = useDispatch();
  const { products, isAdmin } = useSelector((state) => state.inventory);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleToggleDisable = (id) => {
    dispatch(toggleProductDisabled(id));
  };

  const formatPrice = (price) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? price : `$${numPrice.toFixed(2)}`;
  };

  return (
    <div className="inventory-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.disabled ? "disabled" : ""}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.quantity}</td>
              <td className="actions">
                <button
                  onClick={() => setEditingProduct(product)}
                  disabled={!isAdmin || product.disabled}
                  className={!isAdmin ? "user-view" : "edit-btn"}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleToggleDisable(product.id)}
                  disabled={!isAdmin}
                  className={!isAdmin ? "user-view" : "disable-btn"}
                >
                  {product.disabled ? <FaEye /> : <FaEyeSlash />}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={!isAdmin}
                  className={!isAdmin ? "user-view" : "delete-btn"}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default InventoryTable;
