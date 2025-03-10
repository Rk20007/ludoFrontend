import React from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate } from "react-router-dom";

const ButtonSection = ({ data }) => {
  const navigate = useNavigate();

  return (
    <main className="profile-btn-main-container">
      <button className="profile-btn-main" onClick={() => navigate("/wallet")}>
        <AccountBalanceWalletOutlinedIcon />
        My Wallet
      </button>
      {data?.isKYCVerified ? (
        <button
          className="profile-btn-main"
          style={{ opacity: "0.5", cursor: "not-allowed" }}
        >
          <ArticleOutlinedIcon />
          KYC Completed
        </button>
      ) : (
        <button className="profile-btn-main" onClick={() => navigate("/kyc")}>
          <ArticleOutlinedIcon />
          Complete KYC
        </button>
      )}
    </main>
  );
};

export default ButtonSection;
