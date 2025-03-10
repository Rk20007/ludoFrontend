import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { loginbyNumber } from "../../API/API";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Dialog } from "@mui/material";

const Login = () => {
  const refData = new URLSearchParams(window.location.search).get("refer");
  const navigate = useNavigate();
  const [payload, setPayload] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!payload || payload.length !== 10) {
      toast.error("Please enter a valid phone number");
      setLoading(false);

      return;
    } else {
      const getResponse = await loginbyNumber(payload);
      if (getResponse.status === 500) {
        toast.error("Something went wrong");
      }
      if (getResponse.statusCode === 200) {
        toast.success(getResponse.message);
        navigate(
          `/verify-otp?number=${payload}&info=${getResponse.data.isCouponApplied}&referal=${refData}`
        );
      } else {
        toast.error(getResponse.response.data.message);
      }
      setLoading(false);
    }
  };

  return (
    <main className="main-container-login">
      <section className="login-section-card">
        <div className="login-section-card-header">Sign In</div>
        <div>
          {" "}
          <img src="/mainLogoRing.png" style={{ height: "180px" }} />
        </div>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          fullWidth
          type="number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
            },
          }}
          onChange={(e) => setPayload(e.target.value)}
        />
        {!loading ? (
          <button 
          className="login-page-btn-primary" 
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
          onClick={handleLogin}
        >
          Continue
        </button>
        
        ) : (
          <button className="login-page-btn-primary">
            <CircularProgress size="30px" />
          </button>
        )}
        <p className="login-footer">
          By continuing, I agree to RingLudo's
          <a href="#"> Privacy Policy</a> and confirm that I am 18 years or older.
          I am not playing from Assam, Odisha, Nagaland, Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
        </p>
      </section>
    </main>
  );
};

export default Login;
