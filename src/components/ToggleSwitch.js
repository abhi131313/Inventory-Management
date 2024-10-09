import React from "react";
import "./ToggleSwitch.scss";

function ToggleSwitch({ isOn, handleToggle }) {
  return (
    <div className="toggle-switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor="react-switch-new">
        <span className="react-switch-button" />
      </label>
      <span className="toggle-label">{isOn ? "Admin" : "User"}</span>
    </div>
  );
}

export default ToggleSwitch;
