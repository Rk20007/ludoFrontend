import dayjs from "dayjs";
import React from "react";

const UserDetails = ({ data }) => {
  const {
    name,
    isKYCVerified,
    mobileNo,
    balance,
    totalWithdrawAmount,
    holdBalance,
    totalReferralCount,
    totalDepositAmount,
    missmatchWalletBallance,
    createdAt,
    updatedAt,
    referalCode,
    referedBy,
  } = data?.user;

  return (
    <div className="user-details-main">
      <h1>User Details</h1>
      <div className="user-details-main-dir">
        <h3>Name : {name}</h3>
        <h3>
          Verified :{" "}
          {isKYCVerified ? (
            <span className="verified-status">verified</span>
          ) : (
            <span
              className="verified-status"
              style={{ backgroundColor: "red" }}
            >
              not verified
            </span>
          )}
        </h3>
        <h3>Phone : {mobileNo}</h3>
        <h3>Wallet Balance : ₹{balance.cashWon + balance.totalBalance}</h3>
        <h3>Withdrawal Amount Balanace : ₹{totalWithdrawAmount}</h3>
        <h3>Withdrawal Hold Balance : ₹{holdBalance}</h3>
        <h3>Referral Balance : ₹{balance?.referralEarning}</h3>
        <h3>Referral Count : {totalReferralCount}</h3>
        <h3>Referral Earning : ₹{balance?.totalReferralAmountCredited}</h3>
        <h3>Total Deposite : ₹{totalDepositAmount}</h3>
        <h3>Total Withdrawal : ₹{totalWithdrawAmount}</h3>
        <h3>Total Bonus : ₹{balance?.bonus}</h3>
        <h3>Total Penalty : ₹{balance?.penalty}</h3>
        <h3>Hold Balance : ₹{holdBalance}</h3>
        <h3>Won Amount : ₹{balance?.wonAmount}</h3>
        <h3>Lose Amount : ₹{balance?.loseAmount}</h3>
        <h3>
          Calculated Wallet Balance : ₹{balance?.cashWon + balance.totalBalance}
        </h3>
        <h3>Mismatch Wallet Balance : ₹{missmatchWalletBallance}</h3>
        <h3>Refferal Code : {referalCode}</h3>
        <h3>Referral By : {referedBy?.name}</h3>
        <h3>
          Account Created At -{" "}
          {`${dayjs(createdAt).format("DD/MM/YYYY")} & ${dayjs(
            createdAt
          ).format("hh:mm A")}`}
        </h3>
        <h3>
          Account Updated At -{" "}
          {`${dayjs(updatedAt).format("DD/MM/YYYY")} & ${dayjs(
            createdAt
          ).format("hh:mm A")}`}
        </h3>
      </div>
    </div>
  );
};

export default UserDetails;
