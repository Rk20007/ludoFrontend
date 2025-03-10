import React from "react";

const BattelSection = ({ title, count, logo }) => {
  return (
    <div className="profile-battle-container">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>{logo}</div>
        <div className="profile-battle-logo-text">{title}</div>
      </div>
      <div className="profile-battle-logo-text">{count}</div>
    </div>
  );
};

export default BattelSection;
