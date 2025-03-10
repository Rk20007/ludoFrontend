import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Battle1 = ({ data }) => {
  return (
    <div className="openbattlecard-main-block" style={{ marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1rem",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <img
            src="/user2.jpeg"
            style={{
              height: "2em",
              width: "2em",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div>{data?.createdBy?.name}</div>
        </div>
        <div>
          <img src="/versus.png" style={{ height: "2.5em" }} />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <img
            src="/user2.jpeg"
            style={{
              height: "2em",
              width: "2em",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div>{data?.acceptedBy?.name}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "1.5rem",
          paddingBottom: "1rem",
        }}
      >
        <div className="Battle1-text">PLAYING FOR</div>
        <div className="Battle1-rupee">
          <CurrencyRupeeIcon sx={{ color: "white" }} fontSize="small" />
        </div>
        <div className="Battle1-text">{data?.entryFee}</div>
      </div>
    </div>
  );
};

export default Battle1;
