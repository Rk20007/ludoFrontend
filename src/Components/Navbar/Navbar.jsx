import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getBalanceDetail } from "../../API/API";

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = async () => {
    const getReponse = await getBalanceDetail();
    setData(getReponse?.data);
  };

  const handleDownload = () => {
    window.location.href = "https://ringludo.s3.ap-south-1.amazonaws.com/apk.apk";
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <style>{`
        /* ── Image logo ── */
        .logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          cursor: pointer;
          user-select: none;
          display: block;
          filter: drop-shadow(0 0 4px rgba(255, 80, 80, 0.4));
          transition: filter 0.3s ease;
        }

        .logo-img:hover {
          filter: drop-shadow(0 0 8px rgba(255, 80, 80, 0.85));
        }

        /* ── Wallet / Earning buttons ── */
        .wallet-btn {
          display: flex;
          gap: 7px;
          font-size: 10px;
          width: 5.6rem;
          padding: 5px 9px;
          align-items: center;
          overflow: hidden;
          border-radius: 30px;
          cursor: pointer;
          position: relative;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: background 0.2s, box-shadow 0.2s;
        }

        .wallet-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .wallet-btn .btn-icon img {
          height: 1.5em;
          filter: brightness(1.3);
        }

        .wallet-btn .btn-label {
          display: flex;
          flex-direction: column;
          gap: 1px;
          text-align: start;
        }

        .wallet-btn .btn-label .btn-title {
          color: rgba(255,255,255,0.7);
          font-size: 9px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .wallet-btn .btn-label .btn-value {
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        /* Colored left-border accent per button */
        .wallet-btn.cash-btn {
          border: 1px solid rgba(255, 107, 107, 0.5);
          border-left: 3px solid #ff6b6b;
        }

        .wallet-btn.earn-btn {
          border: 1px solid rgba(255, 209, 102, 0.4);
          border-left: 3px solid #ffd166;
        }

        .wallet-btn.earn-btn .btn-label .btn-value {
          color: #ffd166;
        }
      `}</style>

      <main className="navbar">
        {/* ── LEFT: Logo ── */}
        <div className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="/azadda.png"
            alt="AzAdda Ludo"
            className="logo-img"
            onClick={() =>
              Cookies.get("verifyToken") ? navigate("/tournaments") : navigate("/login")
            }
          />
        </div>

        {/* ── RIGHT ── */}
        <div className="navbar-right-alignment">
          {!Cookies.get("verifyToken") ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button className="login-btn-primary" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Cash / Wallet */}
              <button className="wallet-btn cash-btn" onClick={() => navigate("/wallet")}>
                <div className="btn-icon">
                  <img src="/rupee.png" alt="rupee" />
                </div>
                <div className="btn-label">
                  <span className="btn-title">Cash</span>
                  <span className="btn-value">
                    {(data?.totalBalance + data?.cashWon || 0).toString().length > 7
                      ? (data?.totalBalance + data?.cashWon || 0).toString().substring(0, 5) + "…"
                      : data?.totalBalance + data?.cashWon || 0}
                  </span>
                </div>
              </button>

              {/* Earning */}
              <button className="wallet-btn earn-btn" onClick={() => navigate("/refer-earn")}>
                <div className="btn-icon">
                  <img src="/bag.png" alt="bag" />
                </div>
                <div className="btn-label">
                  <span className="btn-title">Earning</span>
                  <span className="btn-value">{data?.referralEarning || 0}</span>
                </div>
              </button>
            </div>
          )}

          <img
            src="/menu.svg"
            alt="menu"
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer(true)}
          />
        </div>
      </main>
    </>
  );
};

export default Navbar;