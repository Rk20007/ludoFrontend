import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ Component, ...rest }) => {
  const nav = useNavigate();
  const refData = new URLSearchParams(window.location.search).get("refer");

  useEffect(() => {
    const isLogin = Cookies.get("verifyToken");
    if (refData !== null) {
      nav("/login?refer=" + refData);
    }
    if (!isLogin && refData === null) {
      nav("/login");
    }
    if (Cookies.get("verifyToken") && window.location.pathname === "/login") {
      nav("/tournaments");
    }
    if (window.location.pathname === "/") {
      nav("/tournaments");
    }
  }, []);
  return (
    <div>
      <Component {...rest} />
    </div>
  );
};

export default ProtectedRoute;
