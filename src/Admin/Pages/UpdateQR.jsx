import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { handleUpload } from "../../util/Upload";
import { adminGetSetting, adminUpdateQR } from "../../API/API";
import toast from "react-hot-toast";

const UpdateQR = () => {
  const [updateData, setUpdate] = useState({});
  const [payload, setPayload] = useState({
    upiQrCode: "",
    upiId: "",
  });

  const getData = async () => {
    const response = await adminGetSetting();
    setUpdate(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await adminUpdateQR(payload);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      await getData();
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  return (
    <>
      <div className="update-qr-admin">
        <h1>Update QR Codes</h1>
        <TextField
          id="outlined-basic"
          label="Enter UPI ID"
          variant="outlined"
          sx={{ width: "50%" }}
          onChange={(e) => setPayload({ ...payload, upiId: e.target.value })}
        />
        <input
          type="file"
          onChange={async (e) =>
            setPayload({
              ...payload,
              upiQrCode: await handleUpload(e.target.files[0]),
            })
          }
        />
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleUpdate}
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
        <div>Current QR Code -</div>
        <img
          src={updateData?.upiQrCode}
          style={{
            height: "10em",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          paddingTop: "2rem",
        }}
      >
        <div>Current UPI Number -</div>
        <b>{updateData?.upiId}</b>
      </div>
    </>
  );
};

export default UpdateQR;
