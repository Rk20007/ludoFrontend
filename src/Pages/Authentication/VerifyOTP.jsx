import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginbyOtp, redendOtp } from "../../API/API";
import Cookies from "js-cookie";
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
  brandName: { fontSize: "22px", fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.5px" },
  brandMuted: { color: "#888", fontWeight: 700 },
  tagline: { fontSize: "11px", color: "#aaa", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 },
  divider: { width: "100%", height: "1px", background: "#f0f0f0" },
  heading: { fontSize: "22px", fontWeight: 900, color: "#0a0a0a", alignSelf: "flex-start" },
  sub: { fontSize: "13px", color: "#aaa", alignSelf: "flex-start", marginTop: "-12px", fontWeight: 600 },
  phoneBadge: {
    background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: "10px",
    padding: "10px 16px", width: "100%", display: "flex",
    alignItems: "center", justifyContent: "space-between",
  },
  phoneNum: { fontSize: "14px", fontWeight: 800, color: "#0a0a0a" },
  changeLink: { fontSize: "12px", color: "#888", fontWeight: 700, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "2px" },
  inputLabel: { fontSize: "11px", color: "#aaa", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "8px" },
  otpRow: { display: "flex", gap: "10px", width: "100%", justifyContent: "center" },
  otpBox: {
    width: "48px", height: "56px", border: "1.5px solid #e0e0e0",
    borderRadius: "12px", background: "#fafafa", fontSize: "22px",
    fontWeight: 900, color: "#0a0a0a", textAlign: "center",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s, box-shadow 0.2s",
  },
  otpBoxFocus: { borderColor: "#0a0a0a", boxShadow: "0 0 0 3px rgba(0,0,0,0.06)", background: "#fff" },
  inputWrap: {
    width: "100%", background: "#fafafa", border: "1.5px solid #e0e0e0",
    borderRadius: "12px", display: "flex", alignItems: "center", overflow: "hidden",
  },
  resendRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%" },
  resendText: { fontSize: "12px", color: "#aaa", fontWeight: 700 },
  resendBtn: {
    fontSize: "12px", fontWeight: 900, color: "#0a0a0a",
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: "2px",
  },
  resendBtnDisabled: { color: "#ccc", cursor: "default", textDecoration: "none" },
  timerChip: {
    background: "#f0f0f0", borderRadius: "20px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 800, color: "#555",
  },
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

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [focusedIdx, setFocusedIdx] = useState(null);
  const [hover, setHover] = useState(false);
  const inputRefs = useRef([]);

  const mobileNo = new URLSearchParams(window.location.search).get("number");
  const refData = new URLSearchParams(window.location.search).get("referal");
  const isApplied = new URLSearchParams(window.location.search).get("info");
  const [referalCode, setReferalCode] = useState(refData === "null" ? "" : refData || "");

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((p) => p - 1), 1000);
    } else if (timer === 0 && resendDisabled) {
      setResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, resendDisabled]);

  const handleOtpChange = (val, idx) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[idx] = digit;
    setOtpDigits(next);
    if (digit && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otpDigits];
    paste.split("").forEach((ch, i) => { next[i] = ch; });
    setOtpDigits(next);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setTimer(120);
    await redendOtp({ mobileNo });
    toast.success("OTP resent successfully");
  };

  const handleOTP = async () => {
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await loginbyOtp({ otp, referalCode, mobileNo });

      if (res?.statusCode === 200) {
        toast.success(res.message);

        // ✅ Step 1: Save all user data to localStorage first
        localStorage.setItem("userNumber", res.data.user.mobileNo);
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userId", res.data.user._id);

        // ✅ Step 2: Set cookie with path "/" so it's accessible on all routes
        // sameSite: "Lax" prevents it being stripped on internal redirects
        Cookies.set("verifyToken", res.data.token, {
          expires: 10,
          path: "/",
          sameSite: "Lax",
        });

        // ✅ Step 3: Use replace() so back button won't return to OTP page
        // Small timeout ensures cookie is fully committed before route guard runs
        setTimeout(() => {
          window.location.replace("/tournaments");
        }, 100);

      } else if (res?.status === 500) {
        toast.error("Something went wrong");
        setLoading(false);
      } else {
        toast.error(res?.response?.data?.message || "Invalid OTP, please try again");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const formatTimer = () => {
    const m = Math.floor(timer / 60), s = timer % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.cardAccent} />

        <div style={styles.brandRow}>
          <div style={styles.logoWrap}>🎲</div>
          <div style={styles.brandName}>
            MK Ludo<span style={styles.brandMuted}>Adda</span>
          </div>
          <div style={styles.tagline}>Play · Win · Repeat</div>
        </div>

        <div style={styles.divider} />

        <div style={styles.heading}>Verify OTP 🔐</div>
        <div style={styles.sub}>Sent to your mobile number</div>

        <div style={styles.phoneBadge}>
          <span style={styles.phoneNum}>🇮🇳 +91 {mobileNo}</span>
          <span style={styles.changeLink} onClick={() => navigate(-1)}>Change</span>
        </div>

        {/* OTP Boxes */}
        <div style={{ width: "100%" }}>
          <div style={styles.inputLabel}>Enter 6-digit OTP</div>
          <div style={styles.otpRow}>
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="tel"
                maxLength={1}
                value={digit}
                style={{
                  ...styles.otpBox,
                  ...(focusedIdx === i ? styles.otpBoxFocus : {}),
                }}
                onFocus={() => setFocusedIdx(i)}
                onBlur={() => setFocusedIdx(null)}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                onPaste={handlePaste}
              />
            ))}
          </div>
        </div>

        {/* Referral */}
        {isApplied !== "true" && (
          <div style={{ width: "100%" }}>
            <div style={styles.inputLabel}>Referral Code (Optional)</div>
            <div style={styles.inputWrap}>
              <input
                type="text"
                placeholder="Enter referral code"
                value={referalCode}
                onChange={(e) => setReferalCode(e.target.value)}
                style={{
                  flex: 1, border: "none", background: "transparent",
                  padding: "0 14px", height: "48px", fontSize: "14px",
                  fontWeight: 700, color: "#111", outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          </div>
        )}

        {/* Resend */}
        <div style={styles.resendRow}>
          <span style={styles.resendText}>Didn't receive OTP?</span>
          <button
            style={{ ...styles.resendBtn, ...(resendDisabled ? styles.resendBtnDisabled : {}) }}
            onClick={handleResendOTP}
            disabled={resendDisabled}
          >
            Resend
          </button>
          {resendDisabled && <span style={styles.timerChip}>{formatTimer()}</span>}
        </div>

        {/* Verify Button */}
        <button
          style={{
            ...styles.btn,
            ...(hover && !loading ? { background: "#222", transform: "translateY(-1px)" } : {}),
            ...(loading ? { background: "#555", cursor: "default" } : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleOTP}
          disabled={loading}
        >
          {loading
            ? <CircularProgress size="22px" sx={{ color: "#fff" }} />
            : <>Verify OTP &nbsp;→</>}
        </button>

        <p style={styles.footer}>
          Secure login powered by MK LudoAdda.{" "}
          <a href="#" style={styles.footerLink}>Privacy Policy</a>
        </p>
      </section>
    </main>
  );
};

export default VerifyOTP;