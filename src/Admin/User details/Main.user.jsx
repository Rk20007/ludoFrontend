import React, { useEffect, useLayoutEffect, useState } from "react";
import UserDetails from "./UserDetails";
import BankDetails from "./BankDetails";
import ButtonDetails from "./ButtonDetails";
import { adminUserData } from "../../API/API";
import { useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const MainUser = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.body.classList.add("customBody-class");

    return () => {
      document.body.classList.remove("customBody-class");
    };
  }, []);

  async function getData() {
    setOpen(true);
    try {
      const response = await adminUserData(id);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      handleClose();
    }
  }

  useLayoutEffect(() => {
    getData();
  }, []);

  return (
    <>
      {Object.keys(data)?.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          <UserDetails data={data} />
          <BankDetails data={data} />
          <ButtonDetails data={data} />
        </div>
      ) : (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default MainUser;
