import React, { useEffect, useState } from "react";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { getBalanceDetail } from "../../API/API";
import Cookies from "js-cookie";

const Wallet = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = async () => {
    const getReponse = await getBalanceDetail();
    setData(getReponse?.data);
  };

  useEffect(() => {
    if (Cookies.get("verifyToken")) getData();
  }, []);

  return (
    <main className="wallet-main-container">
      <div
        className="wallet-container"
        onClick={() => navigate("/transaction-history")}
      >
        <PublishedWithChangesIcon />
        <div style={{ fontFamily: "sans-serif" }}>Order History</div>
      </div>
      <div className="wallet-container-main">
        <div className="wallet-container-cash">
          <div className="wallet-container-cash-b1">
            {" "}
            <CurrencyRupeeIcon sx={{ color: "white" }} />
            <div className="wallet-container-cash-b1-text">
              {data?.totalBalance || 0}
            </div>
          </div>
          <div className="wallet-container-cash-b1-text wallet-container-cash-b1">
            Deposit Cash
          </div>
          <div
            className="wallet-container-cash-b1-text"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              textAlign: "center",
              paddingTop: "1rem",
              paddingLeft: "0.7rem",
              paddingRight: "0.7rem",
            }}
          >
            Can be used to play Tournaments & Battles. Cannot be withdrawn to
            Paytm or Bank.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1rem",
            }}
          >
            <button
              className="wallet-container-cash-btn"
              onClick={() => navigate("/addcash")}
            >
              Add Cash
            </button>
          </div>
        </div>
        <div className="wallet-container-cash">
          <div className="wallet-container-cash-b1">
            {" "}
            <CurrencyRupeeIcon sx={{ color: "white" }} />
            <div className="wallet-container-cash-b1-text">
              {data?.cashWon || 0}
            </div>
          </div>
          <div className="wallet-container-cash-b1-text wallet-container-cash-b1">
            Winning Cash
          </div>
          <div
            className="wallet-container-cash-b1-text"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              textAlign: "center",
              paddingTop: "1rem",
              paddingLeft: "0.7rem",
              paddingRight: "0.7rem",
            }}
          >
            Can be withdrawn to Paytm or Bank. Can be used to play Tournaments &
            Battles.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1rem",
            }}
          >
            <button
              className="wallet-container-cash-btn"
              onClick={() => navigate("/withdraw")}
            >
              Withdraw Cash
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wallet;
