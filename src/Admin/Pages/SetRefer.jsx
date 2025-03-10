import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  adminGetSetting,
  adminReferAmount,
  adminSetPercentage,
} from "../../API/API";
import toast from "react-hot-toast";

const SetRefer = () => {
  const [updatepayload, setUpdate] = useState({});
  const [payload, setPayload] = useState({
    referralAmountPercentage: "",
    percentage: "",
  });

  const getData = async () => {
    const response = await adminGetSetting();
    setUpdate(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    try {
      const response = await adminReferAmount({
        referralAmountPercentage: payload.referralAmountPercentage,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        await getData();
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const updateDataPercentage = async () => {
    try {
      const response = await adminSetPercentage({
        percentage: payload.percentage,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        await getData();
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  return (
    <>
      <>
        <div className="update-qr-admin">
          <h1>Update Refer Percentage</h1>
          <TextField
            id="outlined-basic"
            label="Enter Refer Percentage"
            variant="outlined"
            sx={{ width: "50%" }}
            onChange={(e) =>
              setPayload({
                ...payload,
                referralAmountPercentage: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={updateData}
          >
            Save
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          <div>Current Refer percentage -</div>
          <b>{updatepayload?.referralAmountPercentage}%</b>
        </div>
      </>
      <>
        <div className="update-qr-admin">
          <h1>Update Battle Commission Percentage</h1>
          <TextField
            id="outlined-basic"
            label="Enter Battle Commission Percentage"
            variant="outlined"
            sx={{ width: "50%" }}
            onChange={(e) =>
              setPayload({
                ...payload,
                percentage: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={updateDataPercentage}
          >
            Save
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          <div>Current Battle Commission Percentage -</div>
          <b>{updatepayload?.battleEarningPercentage}%</b>
        </div>
      </>
    </>
  );
};

export default SetRefer;
