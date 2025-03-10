import React from "react";

const BankDetails = ({ data }) => {
  return (
    <div className="user-details-main-bank">
      <h1>Bank Details</h1>
      <div className="user-details-main-dir-bank">
        <h3>
          Account holder name :{" "}
          {data?.withdrawHistory[0]?.bankAccountDetails?.bankName}
        </h3>
        <h3>
          IFSC code : {data?.withdrawHistory[0]?.bankAccountDetails?.ifscCode}
        </h3>
        <h3>UPI Id : {data?.withdrawHistory[0]?.upiId}</h3>
        <h3>Mismatch : {data?.user?.missmatchWalletBallance}</h3>
        <h3>Hold : {data?.user?.holdBalance}</h3>
      </div>
    </div>
  );
};

export default BankDetails;
