import React from "react";
import { useNavigate } from "react-router-dom";

const LiveBattleCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="openbattlecard-main-block">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div>PLAYING FOR</div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <img src="/rupeeIcon.gif" style={{ height: "1.5em" }} />
            <div>{data?.entryFee}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div>Prize</div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <img src="/rupeeIcon.gif" style={{ height: "1.5em" }} />
            <div>{data?.winnerAmount}</div>
          </div>
        </div>
      </div>
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
            src="/mainLogoRing.png"
            style={{
              height: "4em",
              width: "4em",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div>
            {data?.createdBy?.name.length > 20
              ? `${data?.createdBy?.name?.slice(0, 10)}...`
              : data?.createdBy?.name}
          </div>
        </div>
        <div>
          <img src="/versus.png" style={{ height: "2.5em" }} />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <img
            src="/mainLogoRing.png"
            style={{
              height: "4em",
              width: "4em",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
          <div>
            {data?.acceptedBy?.name.length > 20
              ? `${data?.acceptedBy?.name?.slice(0, 10)}...`
              : data?.acceptedBy?.name}
          </div>
        </div>
      </div>
      {(data?.status === "PLAYING" || data?.status === "CONFLICT") &&
        (data?.createdBy?._id === localStorage.getItem("userId") ||
          data?.acceptedBy?._id === localStorage.getItem("userId")) && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "1rem",
            }}
          >
            <button
              onClick={() =>
                navigate(`/tournaments/classic/battle?id=${data?._id}`)
              }
            >
              View
            </button>
          </div>
        )}
    </div>
  );
};

export default LiveBattleCard;
