import React from "react";
import { useNavigate } from "react-router-dom";

const RechargeKyc = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="recharge-kyc-main" onClick={() => navigate("/kyc")}>
      {text}
    </div>
  );
};

export default RechargeKyc;
