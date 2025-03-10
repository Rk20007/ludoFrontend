import { TextField } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RechargeMain = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState("");
  const handleChahnge = (event) => {
    setAmount(event.target.value);
  };
  const handleAdd = () => {
    if(amount < 50) {
      toast.error("Amount should be greater than 50");
      return;
    }
    navigate(`/recharge-submit?amount=${amount}`);
  };
  return (
    <div className="recharge-main-container">
      <div className="recharge-main-title">Select Amount for Deposite</div>
      <div className="recharge-main-amount">
        <TextField
          id="outlined-basic"
          label="Enter Amount"
          variant="outlined"
          fullWidth
          type="number"
          value={amount}
          onChange={handleChahnge}
        />
      </div>
      <div className="recharge-main-amount-container">
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "#166d3b" }}
          onClick={() => setAmount(100)}
        >
          ₹100
        </button>
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "red" }}
          onClick={() => setAmount(300)}
        >
          ₹300
        </button>
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "blue" }}
          onClick={() => setAmount(500)}
        >
          ₹500
        </button>
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "gold" }}
          onClick={() => setAmount(700)}
        >
          ₹700
        </button>
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "orange" }}
          onClick={() => setAmount(900)}
        >
          ₹900
        </button>
        <button
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "brown" }}
          onClick={() => setAmount(1000)}
        >
          ₹1000
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="recharge-main-btn-add-cash" onClick={handleAdd}>
          Add Cash{" "}
        </button>
      </div>
    </div>
  );
};

export default RechargeMain;
