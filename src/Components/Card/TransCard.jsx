import React from "react";
import dayjs from "dayjs";

const TransCard = ({ date, transaction, amount, time }) => {
  const formattedTime = dayjs(time, "HH:mm").format("hh:mm A");

  return (
    <div className="trans-card">
      <div className="trans-card-amount">
        {date} {formattedTime}
      </div>
      <div className="trans-card-amount">{transaction}</div>
      <div className="trans-card-amount">₹ {amount}</div>
    </div>
  );
};

export default TransCard;
