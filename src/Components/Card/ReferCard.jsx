import dayjs from "dayjs";
import React from "react";

const ReferCard = ({ data }) => {
  return (
    <div
      className="trans-card"
      style={{
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "unset",
      }}
    >
      <div className="trans-card-amount">
        Reffer Name - {data?.userId?.name}
      </div>
      <div className="trans-card-amount">
        Reffer ID - {data?.userId?.referalCode}
      </div>
      <div className="trans-card-amount">
        Date - {dayjs(data?.userId?.createdAt).format("DD/MM/YYYY")}
      </div>
      <div className="trans-card-amount">
        Total Earning - ₹{data?.referralEarning}
      </div>
    </div>
  );
};

export default ReferCard;
