import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetSetting } from "../../API/API";
import { FaWhatsapp } from "react-icons/fa";

const S = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
    fontFamily: "'Nunito', sans-serif",
    paddingBottom: "80px",
  },

  /* KYC Banner */
  kycBanner: {
    background: "#ffe082",
    borderBottom: "1px solid #f5b8d0",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  kycLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: 800,
    color: "#615151",
  },
  kycDot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#e8003a",
  },
  kycBtn: {
    background: "#7c7678",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  /* Notice Banner */
  notice: {
    background: "#fff8e1",
    border: "1px solid #ffe082",
    margin: "12px 12px 0",
    borderRadius: "10px",
    padding: "12px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  noticeText: {
    fontSize: "12px",
    color: "#5d4037",
    fontWeight: 700,
    lineHeight: 1.7,
  },

  /* Header */
  gamesHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 16px 14px",
  },
  gamesTitle: {
    fontSize: "22px",
    fontWeight: 900,
    color: "#0a0a0a",
  },
  rulesBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "#fff",
    border: "1.5px solid #e0e0e0",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: 800,
    color: "#333",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },

  /* Game Grid — 2 cards side by side */
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    padding: "0 12px",
  },
  gameCard: {
    borderRadius: "14px",
    overflow: "hidden",
    cursor: "pointer",
    background: "#111",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    position: "relative",
    aspectRatio: "1 / 1",
    transition: "transform 0.15s",
  },
  gameImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  gameLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 900,
    padding: "18px 10px 8px",
    letterSpacing: "0.3px",
  },

  /* WhatsApp float */
  waFloat: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25d366",
    color: "#fff",
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
    zIndex: 1000,
    textDecoration: "none",
    fontSize: "28px",
    transition: "transform 0.2s",
  },

  /* Rules Modal */
  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  modal: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
  },
};

const RulesModal = ({ onClose }) => (
  <div style={S.modalBg} onClick={onClose}>
    <div style={S.modal} onClick={(e) => e.stopPropagation()}>
      <div style={{ fontSize: "18px", fontWeight: 900, color: "#0a0a0a", marginBottom: "16px" }}>
        📋 Game Rules
      </div>
      {[
        "सभी मेंबर गेम प्ले करने से पहले गेम के रूल जान लें।",
        "बाद ही गेम प्ले करें।",
        "Withdrawal — एक id से 24 घंटे में सिर्फ 2 ही Withdrawal ले सकते है।",
        "Any time 24 hour withdrawal — 5% कमीशन, 2% रेफरल।",
      ].map((rule, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "13px", color: "#333", fontWeight: 700, lineHeight: 1.6 }}>
          <span style={{ color: "#e8003a", fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
          {rule}
        </div>
      ))}
      <button
        onClick={onClose}
        style={{ width: "100%", padding: "13px", borderRadius: "12px", border: "none", background: "#0a0a0a", color: "#fff", fontSize: "14px", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", marginTop: "8px" }}
      >
        Got it ✓
      </button>
    </div>
  </div>
);

const TournamentMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [showRules, setShowRules] = useState(false);
  const [kycDismissed, setKycDismissed] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await adminGetSetting();
      setData(res?.data?.data);
    };
    getData();
  }, []);

  return (
    <div style={S.page}>

      {/* KYC Banner */}
      {!kycDismissed && (
        <div style={S.kycBanner}>
          <div style={S.kycLeft}>
            <div style={S.kycDot} />
            KYC Pending
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={S.kycBtn} onClick={() => navigate("/kyc")}>
              Complete Here
            </button>
            <span
              style={{ fontSize: "20px", color: "#c0005a", cursor: "pointer", fontWeight: 900, lineHeight: 1 }}
              onClick={() => setKycDismissed(true)}
            >
              ×
            </span>
          </div>
        </div>
      )}

      {/* Notice Banner */}
      <div style={S.notice}>
        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>⚠️</span>
        <div style={S.noticeText}>
          Notice:- सभी मेंबर गेम प्ले करने से पहले गेम के रूल जान लें उसके
          बाद ही गेम प्ले करें। Withdrawal आप एक id से 24 घंटे में सिर्फ 2 ही
          Withdrawal ले सकते है।
        </div>
      </div>

      {/* Games Header */}
      <div style={S.gamesHeader}>
        <div style={S.gamesTitle}>Games</div>
        <button style={S.rulesBtn} onClick={() => setShowRules(true)}>
          ℹ️ Rules
        </button>
      </div>

      {/* 2 Game Cards */}
      <div style={S.grid}>

        {/* Ludo Classic */}
        <div
          style={S.gameCard}
          onClick={() => navigate("/tournaments/classic")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src="/tournament1.jpg" alt="Ludo Classic" style={S.gameImg} />
          <div style={S.gameLabel}>🎲 Ludo Classic</div>
        </div>

        {/* Snake & Ladder */}
        {/* <div
          style={S.gameCard}
          onClick={() => navigate("/tournaments/snake-ladder")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src="/tournament3.png" alt="Snake & Ladder" style={S.gameImg} />
          <div style={S.gameLabel}>🐍 Snake & Ladder</div>
        </div> */}
        <div
  style={S.gameCard}
  onClick={() => navigate("/support")}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhsXZqVsInTe_eZUaRrEz63doxoFQ4IR_MQ&s" alt="24 Hours Support" style={S.gameImg} />
  <div style={S.gameLabel}>🎧 24 Hours Support</div>
</div>

      </div>

      {/* WhatsApp Float */}
      <a
        href={`https://wa.me/${data?.whatsAppNumber || "918395907209"}`}
        target="_blank"
        rel="noopener noreferrer"
        style={S.waFloat}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <FaWhatsapp />
      </a>

      {/* Rules Modal */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default TournamentMain;