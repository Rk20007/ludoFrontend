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
<img 
  src="/mainLogoRing.png" 
  style={{ 
    height: "3.5rem",
    paddingBottom: "5px",
  }} 
/>

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
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="login-btn-primary"
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "10px",
                  width: "5.5rem",
                  paddingLeft: "9px",
                  paddingRight: "9px",
                  alignItems: "center",
                  overflow: "hidden",
                  color:"white",
                  borderRadius:"30px",
                  background: "linear-gradient(45deg,#c80001,#c80001,#0000,#fcfbfbb3)", // Light Red to Black


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
                  fontSize: "10px",
                  alignItems: "center",
                  width: "5.5rem",
                  paddingLeft: "9px",
                  paddingRight: "9px",
                  overflow: "hidden",
                  borderRadius:"30px",
                  color:"white",
                  background: "linear-gradient(45deg,#c80001,#c80001,#0000,#fcfbfbb3)", // Light Red to Black

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
