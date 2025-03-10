import React from "react";
import toast from "react-hot-toast";

const RefferalSection = ({ data }) => {
  return (
    <div className="profile-refferal-section">
      <div className="profile-refferal-title">USE REFER CODE</div>
      <div className="profile-refferal-code-container">
        <div className="profile-refferal-code">
          {data?.referalCode}
        </div>
        <button
          className="profile-refferal-copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(data?.referalCode);
            toast.success("Copied to clipboard");
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default RefferalSection;
