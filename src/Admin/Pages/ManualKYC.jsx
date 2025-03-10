import { TextField } from "@mui/material";
import React, { useState } from "react";
import { handleUpload } from "../../util/Upload";
import { kycDataUploadAdmin } from "../../API/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManualKYC = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    frontPhoto: "",
    backPhoto: "",
    aadharNumber: "",
    mobileNo: "",
  });

  const handleSubmit = async () => {
    if (
      payload.name === "" ||
      payload.aadharNumber === "" ||
      payload.frontPhoto === "" ||
      payload.backPhoto === "" ||
      payload.mobileNo === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    } else {
      const response = await kycDataUploadAdmin(payload);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        setPayload({
          name: "",
          frontPhoto: "",
          backPhoto: "",
          aadharNumber: "",
          mobileNo: "",
        });
        navigate("/admin/secure/kyc");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main
      className="kyc-main-container"
      style={{ overflowY: "scroll", maxHeight: "100vh", marginBottom: "6rem" }}
    >
      <div className="kyc-title">Complete KYC</div>
      <div className="kyc-desc">Enter details of Aadhar Card:</div>
      <div className="kyc-input-container">
        <div className="kyc-input-file">
          <label>Upload Front Image</label>
          <input
            type="file"
            onChange={async (e) =>
              setPayload({
                ...payload,
                frontPhoto: await handleUpload(e.target.files[0]),
              })
            }
          />
        </div>
        <div className="kyc-input-file">
          <label>Upload Back Image</label>
          <input
            type="file"
            onChange={async (e) =>
              setPayload({
                ...payload,
                backPhoto: await handleUpload(e.target.files[0]),
              })
            }
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Enter Name"
          variant="outlined"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Aadhar Number"
          type="number"
          variant="outlined"
          value={payload.aadharNumber}
          onChange={(e) =>
            setPayload({ ...payload, aadharNumber: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          type="number"
          variant="outlined"
          value={payload.mobileNo}
          onChange={(e) => setPayload({ ...payload, mobileNo: e.target.value })}
        />
      </div>
      <button
        className="kyc-page-btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </main>
  );
};

export default ManualKYC;
