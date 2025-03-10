import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AcceptBattleAPI,
  AcceptRejectBattleAPI,
  DeleteBattleAPI,
  StartBattleAPI,
} from "../../API/API";
import toast from "react-hot-toast";

const OpenBattleCard = ({ data, isshow, wholeData }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await DeleteBattleAPI(data?._id);
      toast.success(response.data.message);
      setLoadingDelete(false);
    } catch (error) {
      console.log("error", error);
      setLoadingDelete(false);
      toast.error(error.response.data.message);
    }
  };

  const [isplay, setPlay] = useState(false);

  useEffect(() => {
    const findValue = wholeData.filter((item) => item.showButton === "start");
    if (findValue.length > 0) setPlay(true);
  }, [data]);

  const handlePlay = async () => {
    if (isshow === true) {
      toast.error("Already accepted");
      return;
    }
    if (isplay) {
      toast.error("Already playing battle");
      return;
    }
    try {
      const response = await AcceptBattleAPI(data?._id);
      toast.success(response.data.message);
      // navigate("/tournaments/classic/battle");
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const handleReject = async (value) => {
    try {
      const response = await AcceptRejectBattleAPI({
        battleId: data?._id,
        status: value,
      });
      toast.success(response.data.message);
      if (value === "accept")
        window.location.href = `/tournaments/classic/battle?id=${data?._id}`;
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const handleStart = async () => {
    setLoader(true);
    try {
      let f_result =
        localStorage.getItem("userId") === data?.acceptedBy?._id ? true : false;
      if (f_result) {
        const response = await StartBattleAPI(data?._id);
        toast.success(response.data.message);
      }
      window.location.href = `/tournaments/classic/battle?id=${data?._id}`;
    } catch (error) {
      console.log("error", error);
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="openbattlecard-main-block">
      <div>
        CHALLENGE FROM{" "}
        <span style={{ color: "yellow" }}>{data?.createdBy?.name}</span>
      </div>
      <div className="openbattlecard-main-block-2">
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Entry Fee</div>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <img src="/rupeeIcon.gif" style={{ height: "1.5em" }} />
              <div>{data?.entryFee}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Prize</div>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <img src="/rupeeIcon.gif" style={{ height: "1.5em" }} />
              <div>{data?.winnerAmount}</div>
            </div>
          </div>
        </div>
        <div>
          {(() => {
            if (data?.showButton === "play") {
              return (
                <button
                  className="openbattlecard-main-block-2-btn"
                  onClick={handlePlay}
                >
                  Play
                </button>
              );
            } else if (data?.showButton === "waiting") {
              return (
                <div style={{ display: "flex", gap: "5px" }}>
                  <button className="openbattlecard-main-block-2-btn">
                    Requested
                  </button>
                  <button
                    className="openbattlecard-main-block-2-btn"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleReject("reject")}
                  >
                    Reject
                  </button>
                </div>
              );
            } else if (data?.showButton === "start") {
              return (
                <button
                  className="openbattlecard-main-block-2-btn"
                  style={{
                    backgroundColor: `${loader ? "gray" : "green"}`,
                    color: "white",
                  }}
                  onClick={handleStart}
                  disabled={loader === true ? true : false}
                >
                  Start
                </button>
              );
            } else if (data?.showButton === "accept") {
              return (
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="openbattlecard-main-block-2-btn"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => handleReject("accept")}
                  >
                    Start
                  </button>
                  <button
                    className="openbattlecard-main-block-2-btn"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleReject("reject")}
                  >
                    Reject
                  </button>
                </div>
              );
            } else if (data?.showButton === "delete") {
              return (
                <>
                  {loadingDelete ? (
                    <button
                      className="openbattlecard-main-block-2-btn"
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      please wait
                    </button>
                  ) : (
                    <button
                      className="openbattlecard-main-block-2-btn"
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                </>
              );
            }
          })()}
        </div>
      </div>
      {(() => {
        if (data?.showButton === "delete") {
          return (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
            >
              <img src="/loading_old.gif" style={{ height: "1.7em" }} />
              <div className="op-extra">Finding player...</div>
            </div>
          );
        } else if (data?.showButton === "accept") {
          return <div className="op-extra">{data?.acceptedBy?.name}</div>;
        }
      })()}
    </div>
  );
};

export default OpenBattleCard;
