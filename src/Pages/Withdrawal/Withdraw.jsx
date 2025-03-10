import React, { useEffect } from "react";
import WithdrawMain from "./WithdrawMain";
import RechargeKyc from "../../Components/Card/RechargeKyc";
import { profileData } from "../../API/API";

const Withdraw = () => {
  const [status, setStatus] = React.useState(false);
  const getData = async () => {
    const response = await profileData();
    setStatus(response.data.data.isKYCVerified);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="recharge-main">
      {status ? (
        <WithdrawMain />
      ) : (
        <RechargeKyc text={"Complete KYC to take Withdrawals"} />
      )}
    </div>
  );
};

export default Withdraw;
