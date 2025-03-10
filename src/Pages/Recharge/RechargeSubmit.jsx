import { Button, TextField, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { handleUpload } from "../../util/Upload";
import toast from "react-hot-toast";
import { adminGetSetting, rechargeAPI } from "../../API/API";
import { useNavigate } from "react-router-dom";

const RechargeSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // Added state for file upload tracking
  const navigate = useNavigate();
  const amount = new URLSearchParams(window.location.search).get("amount");

  const [payload, setPayload] = useState({
    amount: amount,
    type: "deposit",
    screenShot: "",
    utrNo: "",
  });

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleProceed = async () => {
    setLoading(true);
    if (payload.utrNo.length !== 12) {
      toast.error("Please enter a valid UTR Number");
      setLoading(false);
      return;
    }
    if (!payload.utrNo || payload.screenShot === "") {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const getResponse = await rechargeAPI(payload);
      if (getResponse.data.statusCode === 201) {
        toast.success(getResponse.data.message);
        navigate("/transaction-history");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error processing request");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    const response = await adminGetSetting();
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.upiId);
    toast.success("UPI Id Copied");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true); // Show backdrop
    setOpen(true);
    try {
      const uploadedFileUrl = await handleUpload(file);
      setPayload((prev) => ({ ...prev, screenShot: uploadedFileUrl }));
    } catch (error) {
      toast.error("File upload failed");
    } finally {
      setUploading(false);
      setOpen(false); // Hide backdrop after upload
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="recharge-submit-main">
        <main className="recharge-payment-main">
          <img src={data?.upiQrCode} style={{ width: "50%" }} alt="QR Code" />
        </main>
        <div className="recharge-payment-main3">OR</div>
        <main>
          <div className="recharge-payment-main4">
            <div>{data?.upiId}</div>
            <div onClick={handleCopy}>Copy</div>
          </div>
        </main>
        <main className="recharge-payment-main-p2">
          <div className="recharge-payment-main5">
            Total Amount to be Paid is ₹{amount}
          </div>
          <div className="kyc-input-file">
            <label>Payment Proof</label>
            <input type="file" onChange={handleFileUpload} />
          </div>
          <TextField
            id="outlined-basic"
            label="Enter Ref or Transaction ID"
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, utrNo: e.target.value }))
            }
          />
          {!loading ? (
            <Button
              variant="contained"
              onClick={handleProceed}
              disabled={uploading}
            >
              Proceed
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Please wait...
            </Button>
          )}
        </main>
      </div>
    </>
  );
};

export default RechargeSubmit;
