import React, { useEffect } from "react";
import RechargeTop from "../../Components/Card/RechargeTop";
import RechargeKyc from "../../Components/Card/RechargeKyc";
import RechargeMain from "./RechargeMain";
import { profileData } from "../../API/API";

const Recharge = () => {
  return (
    <div className="recharge-main">
      <RechargeTop />
      <RechargeMain />
    </div>
  );
};

export default Recharge;
