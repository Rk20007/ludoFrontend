import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    Cookies.remove("verifyToken");
    window.location.href = "/login";
  }, []);
  return <div>Logout...</div>;
};

export default Logout;
