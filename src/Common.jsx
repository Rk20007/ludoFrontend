import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import NavDrawer from "./Components/Drawer/NavDrawer";
import { Toaster } from "react-hot-toast";
import AdminNavbar from "./Admin/Components/AdminNavbar";

const Common = () => {
  const location = useLocation();
  const path = location.pathname.split("/");

  useEffect(() => {
    document.body.style.backgroundColor = !path.includes("admin")
      ? "#47586b"
      : "#ffffff";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [path]);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpen(newOpen);
  };

  return (
    <div>
      {path.includes("admin") ? (
        <AdminNavbar />
      ) : (
        <Navbar toggleDrawer={toggleDrawer} />
      )}
      {isOpen && <NavDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />}
      <div
        className={`${
          path.includes("admin") ? "admin-outlet-container" : "outlet-container"
        }`}
      >
        <Outlet />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Common;
