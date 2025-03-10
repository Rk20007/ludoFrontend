import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { handleUpload } from "../../util/Upload";
import toast from "react-hot-toast";
import { BattleResultAPI } from "../../API/API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BattleUpload = ({ id, status, isTrue, data }) => {
  const [loader, setLoader] = useState(false);
  const [payload, setPayload] = React.useState({
    battleId: id,
    matchStatus: "",
    cancellationReason: "",
    screenShot: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleFileUpload = async (file) => {
    handleOpen();
    try {
      const uploadedFile = await handleUpload(file);
      setPayload((prev) => ({ ...prev, screenShot: uploadedFile }));
    } catch (error) {
      toast.error("Screenshot upload failed. Please try again.");
    } finally {
      handleClose();
    }
  };

  const sendData = async () => {
    setLoader(true);
    if (!payload.matchStatus) {
      toast.error("Please fill all the fields");
      setLoader(false);
      return;
    }
    if (payload.matchStatus === "WON" && !payload.screenShot) {
      toast.error("Please upload a screenshot");
      setLoader(false);
      return;
    }
    handleOpen();
    try {
      const payData = {
        battleId: payload.battleId,
        matchStatus: payload.matchStatus,
        cancellationReason:
          payload.matchStatus === "CANCELLED"
            ? payload.cancellationReason
            : undefined,
        screenShot:
          payload.matchStatus === "WON" ? payload.screenShot : undefined,
      };
      const response = await BattleResultAPI(payData);
      toast.success(response.data.message);
      setLoader(true);
      window.location.href = `/tournaments`;
    } catch (error) {
      console.log("error", error);
      setLoader(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      handleClose();
    }
  };

  return (
    <>
      {status === null ? (
        <div className="battle-upload-main">
          <div className="battle-upload-title">MATCH STATUS</div>
          <div className="battle-upload-title">
            After completing your game, select the status and upload a
            screenshot if needed.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "1rem",
            }}
          >
            <RadioGroup
              row
              name="match-status-group"
              onChange={(e) =>
                setPayload({ ...payload, matchStatus: e.target.value })
              }
            >
              {data?.roomNo && (
                <FormControlLabel
                  value="WON"
                  control={<Radio />}
                  label="I WON"
                />
              )}
              {data?.roomNo && (
                <FormControlLabel
                  value="LOSS"
                  control={<Radio />}
                  label="I LOST"
                />
              )}
              <FormControlLabel
                value="CANCELLED"
                control={<Radio />}
                label="CANCEL"
              />
            </RadioGroup>
          </div>
          <div className="battle-upload-upload">
            {(payload.matchStatus === "WON" ||
              payload.matchStatus === "CANCELLED") && (
              <label>Upload Screenshot</label>
            )}
            {payload.matchStatus === "WON" ? (
              <input
                type="file"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            ) : payload.matchStatus === "CANCELLED" ? (
              <select
                onChange={(e) =>
                  setPayload({ ...payload, cancellationReason: e.target.value })
                }
              >
                <option value="">Select a reason</option>
                <option value="No room code">No room code</option>
                <option value="Game not started">Game not started</option>
                <option value="Not joined">Not joined</option>
                <option value="Not playing">Not playing</option>
                <option value="Opponent abusing">Opponent abusing</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <h2>Please press submit button</h2>
            )}
          </div>
          <button
            className="battle-upload-btn"
            onClick={sendData}
            disabled={loader === true ? true : false}
            style={{
              backgroundColor: `${loader && "gray"}`,
            }}
          >
            Submit
          </button>
          <Backdrop sx={{ color: "#fff", zIndex: 1301 }} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div className="battle-upload-main">
          <h1>Your Status has been updated.</h1>
          <h2>Your Status - {status}</h2>
        </div>
      )}
    </>
  );
};

export default BattleUpload;
