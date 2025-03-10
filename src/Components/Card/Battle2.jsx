import React, { useState } from "react";
import toast from "react-hot-toast";
import { SendRoomIDAPI } from "../../API/API";

const Battle2 = ({ id, getData, data }) => {
  const [roomId, setRoomID] = useState("");
  const sendData = async () => {
    if(roomId.length !== 8) {
      toast.error("Room ID should be 8 digits");
      return;
    }
    else {
      try {
        const response = await SendRoomIDAPI({
          battleId: id,
          roomNumber: roomId,
        });
        toast.success(response.data.message);
        await getData();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="openbattlecard-main-block"
      style={{
        marginTop: "1.5rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div className="battle2-title">SET ROOM CODE</div>
      <div className="battle2-title">लूडो किंग से रूम कोड अपलोड करें</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {(() => {
          if (
            data?.createdBy?._id === localStorage.getItem("userId") &&
            data?.roomNo === null
          ) {
            return (
              <>
                <input
                  placeholder="2312XXX"
                  className="ClassicGame-input"
                  value={data?.roomNo || roomId}
                  onChange={(e) => setRoomID(e.target.value)}
                />
                <button
                  className="ClassicGame-btn"
                  style={{
                    backgroundColor: "#00308F",
                    backgroundImage: "unset",
                  }}
                  onClick={sendData}
                >
                  Submit
                </button>
              </>
            );
          } else {
            return (
              <>
                <input
                  className="ClassicGame-input"
                  value={data?.roomNo || "Waiting..."}
                  type="text"
                  disabled
                />
                <button
                  className="ClassicGame-btn"
                  style={{
                    backgroundColor: "#00308F",
                    backgroundImage: "unset",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(data?.roomNo);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Battle2;
