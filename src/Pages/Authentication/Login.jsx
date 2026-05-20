import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { loginbyNumber } from "../../API/API";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px 36px 32px",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: "20%",
    width: "60%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #111, transparent)",
    borderRadius: "2px",
  },
  brandRow: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" },
  logoWrap: {
    width: "68px", height: "68px", borderRadius: "18px",
    background: "#0a0a0a", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "30px",
  },
  brandName: { fontSize: "28px", fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.5px" },
  tagline: { fontSize: "11px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 },
  divider: { width: "100%", height: "1px", background: "#f0f0f0" },
  badges: { display: "flex", gap: "8px", width: "100%" },
  badge: {
    flex: 1, background: "#fafafa", border: "1px solid #ebebeb",
    borderRadius: "10px", padding: "9px 4px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
  },
  badgeIcon: { fontSize: "15px" },
  badgeText: { fontSize: "10px", color: "#888", fontWeight: 700, textAlign: "center", lineHeight: 1.3 },
  heading: { fontSize: "22px", fontWeight: 900, color: "#0a0a0a", alignSelf: "flex-start" },
  sub: { fontSize: "13px", color: "#aaa", alignSelf: "flex-start", marginTop: "-12px", fontWeight: 600 },
  btn: {
    width: "100%", padding: "14px", borderRadius: "12px",
    border: "none", background: "#0a0a0a", color: "#fff",
    fontSize: "15px", fontWeight: 900, letterSpacing: "0.3px",
    cursor: "pointer", transition: "background 0.15s, transform 0.15s",
    fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
  },
  footer: { fontSize: "10.5px", color: "#bbb", textAlign: "center", lineHeight: 1.7, fontWeight: 600 },
  footerLink: { color: "#666", textDecoration: "underline", textUnderlineOffset: "2px" },
};

const muiSx = {
  "& label": { fontFamily: "'Nunito',sans-serif", fontWeight: 700, color: "#aaa", fontSize: "14px" },
  "& label.Mui-focused": { color: "#0a0a0a" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", fontFamily: "'Nunito',sans-serif",
    fontWeight: 700, fontSize: "16px", background: "#fafafa",
    "& fieldset": { borderColor: "#e0e0e0", borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: "#bbb" },
    "&.Mui-focused fieldset": { borderColor: "#0a0a0a", borderWidth: "1.5px" },
  },
  "& input[type=number]": { MozAppearance: "textfield" },
  "& input[type=number]::-webkit-outer-spin-button,& input[type=number]::-webkit-inner-spin-button": { WebkitAppearance: "none" },
};

const Login = () => {
  const refData = new URLSearchParams(window.location.search).get("refer");
  const navigate = useNavigate();
  const [payload, setPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    if (!payload || payload.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      setLoading(false);
      return;
    }
    const res = await loginbyNumber(payload);
    if (res.status === 500) toast.error("Something went wrong");
    else if (res.statusCode === 200) {
      toast.success(res.message);
      navigate(`/verify-otp?number=${payload}&info=${res.data.isCouponApplied}&referal=${refData}`);
    } else toast.error(res.response?.data?.message || "Login failed");
    setLoading(false);
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.cardAccent} />
        <div style={styles.brandRow}>
          <div style={styles.logoWrap}>🎲</div>
          <div style={styles.brandName}>LudoAdda</div>
          <div style={styles.tagline}>Play · Win · Repeat</div>
        </div>
        <div style={styles.divider} />
        <div style={styles.badges}>
          {[["🔒","100% Secure"],["⚡","Instant OTP"],["🏅","Real Rewards"]].map(([icon,text]) => (
            <div style={styles.badge} key={text}>
              <span style={styles.badgeIcon}>{icon}</span>
              <span style={styles.badgeText}>{text}</span>
            </div>
          ))}
        </div>
        <div style={styles.heading}>Welcome back 👋</div>
        <div style={styles.sub}>Enter your number to continue</div>
        <TextField
          label="Phone Number" fullWidth type="number" variant="outlined"
          value={payload} inputProps={{ maxLength: 10 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ fontWeight: 800, color: "#0a0a0a", fontSize: "14px" }}>🇮🇳 +91</span>
              </InputAdornment>
            ),
          }}
          sx={muiSx}
          onChange={(e) => setPayload(e.target.value.slice(0, 10))}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <button
          style={{
            ...styles.btn,
            ...(hover && !loading ? { background: "#222", transform: "translateY(-1px)" } : {}),
            ...(loading ? { background: "#555", cursor: "default" } : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size="22px" sx={{ color: "#fff" }} /> : <>Login &nbsp;→</>}
        </button>
        <p style={styles.footer}>
          By continuing, you agree to LudoAdda's{" "}
          <a href="#" style={styles.footerLink}>Privacy Policy</a>. You confirm you are 18+
          and not playing from Assam, Odisha, Nagaland, Sikkim, Meghalaya, Andhra Pradesh, or Telangana.
        </p>
      </section>
    </main>
  );
};

export default Login;