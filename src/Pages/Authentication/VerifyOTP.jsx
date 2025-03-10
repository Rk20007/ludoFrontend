import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginbyOtp, redendOtp } from "../../API/API";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const mobileNo = new URLSearchParams(window.location.search).get("number");
  const refData = new URLSearchParams(window.location.search).get("referal");
  const isApplied = new URLSearchParams(window.location.search).get("info");
  const [payload, setPayload] = useState({
    otp: "",
    referalCode: refData === "null" ? "" : refData,
  });

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && resendDisabled) {
      setResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, resendDisabled]);

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setTimer(120);
    await redendOtp({
      mobileNo: mobileNo,
    });
    toast.success("OTP resent successfully");
  };

  const handleOTP = async () => {
    setLoading(true);
    if (!payload.otp || payload.otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      setLoading(false);
      return;
    }

    const getResponse = await loginbyOtp({ ...payload, mobileNo });
    if (getResponse.status === 500) {
      toast.error("Something went wrong");
    }
    if (getResponse.statusCode === 200) {
      toast.success(getResponse.message);
      localStorage.setItem("userNumber", getResponse.data.user.mobileNo);
      localStorage.setItem("userRole", getResponse.data.user.role);
      localStorage.setItem("userId", getResponse.data.user._id);
      // Cookies.set("verifyToken", getResponse.data.token);
      Cookies.set("verifyToken", getResponse.data.token, {
        expires: 10,
      });
      window.location.href = "/tournaments";
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <main className="main-container-login">
      <section className="login-section-card">
        <div className="login-section-card-header">Enter 6 digit OTP</div>
        <div>
          <img src="/mainLogoRing.png" style={{ height: "180px" }} />
        </div>
        {isApplied === "true" ? null : (
          <TextField
            id="standard-basic"
            label="Enter Refferal Code (Optional)"
            variant="standard"
            fullWidth
            value={payload.referalCode === "null" ? "" : payload.referalCode}
            onChange={(e) =>
              setPayload({ ...payload, referalCode: e.target.value })
            }
          />
        )}
        <TextField
          id="standard-basic"
          label="Enter OTP here"
          variant="standard"
          fullWidth
          type="number"
          inputProps={{ maxLength: 6 }}
          onInput={(e) => {
            if (e.target.value.length > 6) {
              e.target.value = e.target.value.slice(0, 6);
            }
          }}
          onChange={(e) => setPayload({ ...payload, otp: e.target.value })}
        />
        <div className="resend-otp">
          <button onClick={handleResendOTP} disabled={resendDisabled}>
            {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>
        {!loading ? (
          <button
            className="login-page-btn-primary"
            onClick={handleOTP}
            disabled={loading}
          >
            Verify OTP
          </button>
        ) : (
          <button className="login-page-btn-primary">
            <CircularProgress size="30px" />
          </button>
        )}
      </section>
    </main>
  );
};

export default VerifyOTP;
