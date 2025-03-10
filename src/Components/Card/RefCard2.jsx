import React, { useState } from "react";
import toast from "react-hot-toast";
import { withdrawAPI } from "../../API/API";

const RefCard2 = () => {
  const [amount, setAmount] = useState();
  const handleRedeem = async () => {
    if (!amount) {
      toast.error("Please enter amount");
      return;
    }
    if (amount < 100) {
      toast.error("Amount should be greater than 100");
      return;
    } else {
      try {
        const response = await withdrawAPI({
          amount: amount,
          type: "referral",
        });
        toast.success(response.data.message);
      } catch (error) {
        console.log("error", error);
        toast.error(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div className="refcard2-main">
      <div className="refcard2-title-1">Redeem Your Refer Balance!</div>
      <div className="refcard2-title-2">
        TDS (0%) will be deducted after annual referral earning of ₹15,000.
      </div>
      <div>
        <input
          placeholder="Enter Amount (Min: 100, Max: 10,000)"
          className="refcard2-input"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="refcard2-btn" onClick={handleRedeem}>
        Redeem
      </button>
    </div>
  );
};

export default RefCard2;
