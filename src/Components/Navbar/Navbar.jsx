import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getBalanceDetail } from "../../API/API";
import AddIcon from "@mui/icons-material/Add";

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = async () => {
    const getReponse = await getBalanceDetail();
    setData(getReponse?.data);
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
          <img src="/mainLogoRing.png" style={{ height: "2.8rem" }} />
        </div>
        <div className="navbar-right-alignment">
          {!Cookies.get("verifyToken") ? (
            <button
              className="login-btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
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
                  <div style={{ color: "grey" }}>Cash</div>
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
                  <div style={{ color: "grey" }}>Earning</div>
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
