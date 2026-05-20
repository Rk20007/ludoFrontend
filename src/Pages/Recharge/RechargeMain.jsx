import { TextField } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { startGatewayDeposit } from "../../util/startGatewayDeposit";

const gatewayEnabled = import.meta.env.VITE_USE_GATEWAY_RECHARGE !== "false";

const RechargeMain = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState("");
  const [paying, setPaying] = React.useState(false);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const beginPay = async (value) => {
    const n = Number(value);
    if (!value || Number.isNaN(n) || n < 1) {
      toast.error("Amount should be greater than or equal to ₹1");
      return;
    }
    if (!gatewayEnabled) {
      toast.error("Online payment is not enabled. Contact support to add cash.");
      return;
    }
    setPaying(true);
    try {
      const { payUrl, meta, error } = await startGatewayDeposit(n);
      if (error) {
        toast.error(error);
        return;
      }
      if (payUrl) {
        toast.success("Redirecting to secure payment…");
        window.location.assign(payUrl);
        return;
      }
      if (meta) {
        navigate(`/recharge-submit?amount=${encodeURIComponent(String(n))}`, {
          state: { orderMeta: meta },
        });
        return;
      }
      toast.error("Could not start payment");
    } finally {
      setPaying(false);
    }
  };

  const handlePreset = (preset) => {
    setAmount(preset);
    beginPay(preset);
  };

  const handleAdd = () => {
    beginPay(amount);
  };

  return (
    <div className="recharge-main-container" style={{ position: "relative" }}>
      {paying && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.6)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <span style={{ fontWeight: 600 }}>Starting payment…</span>
        </div>
      )}
      <div className="recharge-main-title">Select Amount for Deposit</div>
      <div className="recharge-main-amount">
        <TextField
          id="outlined-basic"
          label="Enter Amount"
          variant="outlined"
          fullWidth
          type="number"
          value={amount}
          onChange={handleChange}
          disabled={paying}
        />
      </div>
      <div className="recharge-main-amount-container">
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "#166d3b" }}
          disabled={paying}
          onClick={() => handlePreset(100)}
        >
          ₹100
        </button>
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "red" }}
          disabled={paying}
          onClick={() => handlePreset(300)}
        >
          ₹300
        </button>
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "blue" }}
          disabled={paying}
          onClick={() => handlePreset(500)}
        >
          ₹500
        </button>
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "gold" }}
          disabled={paying}
          onClick={() => handlePreset(700)}
        >
          ₹700
        </button>
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "orange" }}
          disabled={paying}
          onClick={() => handlePreset(900)}
        >
          ₹900
        </button>
        <button
          type="button"
          className="recharge-main-amount-btn"
          style={{ backgroundColor: "brown" }}
          disabled={paying}
          onClick={() => handlePreset(1000)}
        >
          ₹1000
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="recharge-main-btn-add-cash"
          onClick={handleAdd}
          disabled={paying}
        >
          Add Cash
        </button>
      </div>
    </div>
  );
};

export default RechargeMain;
