import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";

dayjs.extend(customParseFormat);

const GameCard = ({ data }) => {
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
        {(() => {
          if (localStorage.getItem("userId") === data?.winner?._id) {
            return "WON";
          } else if (data?.matchStatus.toLowerCase() === "cancelled") {
            return "Cancelled";
          } else {
            return "LOST";
          }
        })()}{" "}
        Against - {data?.againstUser?.name || "NA"}
      </div>
      <div className="trans-card-amount">Room ID - {data?.roomNo || "NA"}</div>
      <div className="trans-card-amount">Status - {data?.matchStatus}</div>
      <div className="trans-card-amount">
        Date & Time - {dayjs(data?.updatedAt).format("DD/MM/YYYY")} &{" "}
        {dayjs(data?.updatedAt).format("hh:mm A")}
      </div>
      <div className="trans-card-amount">
        Amount{" "}
        {(() => {
          if (data?.matchStatus.toLowerCase() === "cancelled") {
            return `₹${data?.entryFee}`;
          }
          else if (localStorage.getItem("userId") === data?.winner?._id) {
            return `+ ₹${data?.winnerAmount}`;
          } else {
            return `- ₹${data?.entryFee}`;
          }
        })()}{" "}
      </div>
    </div>
  );
};

export default GameCard;
