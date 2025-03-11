import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getBalanceDetail } from "../../API/API";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
      <main className="navbar">
        <div
          className="navbar-logo"
          onClick={() =>
            Cookies.get("verifyToken")
              ? navigate("/tournaments")
              : navigate("/login")
          }
        >
          <img src="/mainLogoRing.png" style={{ height: "5.0rem",paddingBottom:"10px" }} />
        </div>
        <div className="navbar-right-alignment">
          {!Cookies.get("verifyToken") ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Animated Download Icon */}
            <ArrowDownwardIcon
              className="download-icon"
              onClick={handleDownload}
              style={{
                fontSize: "28px",
                color: "#ff6666",
                cursor: "pointer",
                height:"42px"
              }}
            />
            <button
              className="login-btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="login-btn-primary"
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "12px",
                  width: "6rem",
                  paddingLeft: "9px",
                  paddingRight: "9px",
                  alignItems: "center",
                  overflow: "hidden",
                  color:"white",
                  borderRadius:"20px",
                  background: "linear-gradient(to bottom, #ff6666, #1a1a1a)", // Light Red to Black


                }}
                onClick={() => navigate("/wallet")}
              >
                <div>
                  <img src="/rupee.png" style={{ height: "1.6em" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    textAlign: "start",
                  }}
                >
                  <div style={{ color: "white" }}>Cash</div>
                  <div>
                    {(data?.totalBalance + data?.cashWon || 0).toString()
                      .length > 10
                      ? (data?.totalBalance + data?.cashWon || 0)
                          .toString()
                          .substring(0, 6) + "..."
                      : data?.totalBalance + data?.cashWon || 0}
                  </div>
                </div>
              </button>
              <button
                className="login-btn-primary"
                onClick={() => navigate("/refer-earn")}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "12px",
                  alignItems: "center",
                  width: "6rem",
                  paddingLeft: "9px",
                  paddingRight: "9px",
                  overflow: "hidden",
                  borderRadius:"20px",
                  color:"white",
                  background: "linear-gradient(to bottom, #ff6666, #1a1a1a)", // Light Red to Black

                }}
              >
                <div>
                  <img src="/bag.png" style={{ height: "1.6em" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    textAlign: "start",
                  }}
                >
                  <div style={{ color: "white" }}>Earning</div>
                  <div>{data?.referralEarning || 0}</div>
                </div>
              </button>
            </div>
          )}
          <img
            src="/menu.svg"
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer(true)}
          />
        </div>
      </main>
    </>
  );
};

export default Navbar;
