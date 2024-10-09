import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdminMode, fetchInventory } from "./store/inventorySlice";
import InventoryTable from "./components/InventoryTable";
import StatsWidget from "./components/StatsWidget";
import ToggleSwitch from "./components/ToggleSwitch";
import { FaSignOutAlt } from "react-icons/fa";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.inventory.isAdmin);
  const status = useSelector((state) => state.inventory.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInventory());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  if (status === "failed") {
    return (
      <div className="error">Error loading data. Please try again later.</div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Inventory Stats</h1>
        <div className="header-controls">
          <ToggleSwitch
            isOn={isAdmin}
            handleToggle={() => dispatch(toggleAdminMode())}
          />
          <button className="logout-button">
            <FaSignOutAlt />
          </button>
        </div>
      </header>
      <StatsWidget />
      <InventoryTable />
    </div>
  );
}

export default App;
