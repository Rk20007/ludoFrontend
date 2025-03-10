import { TextField } from "@mui/material";
import React, { useState } from "react";
import { handleUpload } from "../../util/Upload";
import { kycDataUpload } from "../../API/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Kyc = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    frontPhoto: "",
    backPhoto: "",
    aadharNumber: "",
  });
  const [open, setOpen] = useState(false);

  const handleUploadWithBackdrop = async (file, field) => {
    handleOpen();
    try {
      const uploadedFile = await handleUpload(file);
      setPayload((prev) => ({ ...prev, [field]: uploadedFile }));
    } catch (error) {
      toast.error("File upload failed. Please try again.");
    } finally {
      handleClose();
    }
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = async () => {
    if (
      !payload.name ||
      !payload.aadharNumber ||
      !payload.frontPhoto ||
      !payload.backPhoto
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    handleOpen();
    try {
      const response = await kycDataUpload(payload);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        setPayload({
          name: "",
          frontPhoto: "",
          backPhoto: "",
          aadharNumber: "",
        });
        navigate("/profile");
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      handleClose();
    }
  };

  return (
    <main className="kyc-main-container">
      <div className="kyc-title">Complete KYC</div>
      <div className="kyc-desc">
        You need to submit a document that shows you are above 18 years of age
        and not a resident of Assam, Odisha, Sikkim, Nagaland, Telangana,
        Andhra Pradesh, Tamil Nadu, and Karnataka.
      </div>
      <div className="kyc-desc">Enter details of Aadhar Card:</div>
      <div className="kyc-input-container">
        <div className="kyc-input-file">
          <label>Upload Front Image</label>
          <input
            type="file"
            onChange={(e) => handleUploadWithBackdrop(e.target.files[0], "frontPhoto")}
          />
        </div>
        <div className="kyc-input-file">
          <label>Upload Back Image</label>
          <input
            type="file"
            onChange={(e) => handleUploadWithBackdrop(e.target.files[0], "backPhoto")}
          />
        </div>
        <TextField
          label="Enter Name"
          variant="outlined"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
        <TextField
          label="Aadhar Number"
          variant="outlined"
          value={payload.aadharNumber}
          onChange={(e) => setPayload({ ...payload, aadharNumber: e.target.value })}
        />
      </div>
      <button className="kyc-page-btn-primary" onClick={handleSubmit}>
        Submit
      </button>
      <Backdrop sx={{ color: "#fff", zIndex: 1301 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  );
};

export default Kyc;
