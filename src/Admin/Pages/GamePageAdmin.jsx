import React, { useEffect, useState } from "react";
import { adminTournamentGetbyId, adminTournamentResult } from "../../API/API";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const GamePageAdmin = () => {
  const nav = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const getParams = new URLSearchParams(window.location.search);
  const getId = getParams.get("id");
  const [data, setData] = useState({});

  const [valueCreate, setValueCreate] = useState("");
  const [valueAccept, setValueAccept] = useState("");

  // Image modal state
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleImageClick = (src) => {
    setImageSrc(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const response = await adminTournamentGetbyId(getId);
    setData(response.data.data);
  };

  useEffect(() => {
    const intervalData = setInterval(() => {
      getData();
    }, 3000);

    return () => clearInterval(intervalData);
  }, []);

  const handleUpdate = async () => {
    let payload = {};
    if (valueCreate === "cancel" && valueAccept === "cancel") {
      payload = {
        battleId: getId,
        winner: null,
        looser: null,
        isCancelled: true,
      };
    } else if (valueCreate === "won" && valueAccept === "lose") {
      payload = {
        battleId: getId,
        winner: data?.createdBy?._id,
        looser: data?.acceptedBy?._id,
        isCancelled: false,
      };
    } else if (valueCreate === "lose" && valueAccept === "won") {
      payload = {
        battleId: getId,
        winner: data?.acceptedBy?._id,
        looser: data?.createdBy?._id,
        isCancelled: false,
      };
    } else {
      toast.error("Invalid selection. Please check the values for both users.");
      return;
    }
    try {
      const response = await adminTournamentResult(payload);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        nav("/admin/secure/tournaments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <h1 style={{ paddingLeft: `${isSmallScreen ? "2rem" : "unset"}` }}>
        Admin Game Panel
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
        className={isSmallScreen ? "gamePageAdmin-main-mobile" : ""}
      >
        <div className="gamePageAdmin-main">
          <h2>Match Details</h2>
          <h4>Match Fee: {data?.entryFee}</h4>
          <h4>Prize: {data?.winnerAmount}</h4>
          <h4>Type: {"Ludo Classic"}</h4>
          <h4>Status: {data?.status}</h4>
          <h4>Match Status: {data?.matchStatus}</h4>
          <h4>Room Code - {data?.roomNo || "NA"}</h4>
        </div>
        <div className="gamePageAdmin-b1">
          <h2 style={{ margin: "unset" }}>Creator</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              onClick={() =>
                nav(`/admin/secure/user-details/${data?.createdBy?._id}`)
              }
              style={{ cursor: "pointer", color: "orange" }}
            >
              {data?.createdBy?.name}
            </h2>
            {/* <select onChange={(e) => setValueCreate(e.target.value)} id="456">
              <option value={"win"}>Win</option>
              <option value={"loss"}>Loss</option>
              <option value={"cancel"}>Cancel</option>
            </select> */}
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valueCreate}
                  label="Select"
                  onChange={(e) => setValueCreate(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white", // Text color for the selected value
                    },
                  }}
                >
                  <MenuItem value="won">Win</MenuItem>
                  <MenuItem value="lose">Loss</MenuItem>
                  <MenuItem value="cancel">Cancel</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <h4>Hold Balance: {data?.createdHoldAmount}</h4>
          <h4>
            Create Time -{" "}
            {dayjs(data?.createdAt).format("DD-MM-YYYY hh:mm:ss A")}
          </h4>
          <h4>
            Participant Status: {data?.resultUpatedBy?.createdUser?.matchStatus}
          </h4>
          <h4>
            Status Update At:{" "}
            {dayjs(
              data?.resultUpatedBy?.createdUser?.updatedAt
                ? data?.resultUpatedBy?.createdUser?.updatedAt
                : data?.updatedAt
            ).format("DD-MM-YYYY hh:mm:ss A")}
          </h4>
          <h4>Proof</h4>
          <img
            src={data?.resultUpatedBy?.createdUser?.screenShot}
            style={{ height: "10em", width: "15em", cursor: "pointer" }}
            onClick={() =>
              handleImageClick(data?.resultUpatedBy?.createdUser?.screenShot)
            }
          />
        </div>
        <div className="gamePageAdmin-b2">
          <h2 style={{ margin: "unset" }}>Accepter</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              onClick={() =>
                nav(`/admin/secure/user-details/${data?.acceptedBy?._id}`)
              }
              style={{ cursor: "pointer", color: "orange" }}
            >
              {data?.acceptedBy?.name}
            </h2>
            {/* <select onChange={(e) => setValueAccept(e.target.value)} id="123">
              <option value={"win"}>Win</option>
              <option value={"loss"}>Loss</option>
              <option value={"cancel"}>Cancel</option>
            </select> */}
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valueAccept}
                  label="Select"
                  onChange={(e) => setValueAccept(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white", // Text color for the selected value
                    },
                  }}
                >
                  <MenuItem value="won">Win</MenuItem>
                  <MenuItem value="lose">Loss</MenuItem>
                  <MenuItem value="cancel">Cancel</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <h4>Hold Balance: {data?.acceptedHoldAmount}</h4>
          <h4>
            Join Time -{" "}
            {dayjs(data?.acceptedDate).format("DD-MM-YYYY hh:mm:ss A")}
          </h4>
          <h4>
            Participant Status:{" "}
            {data?.resultUpatedBy?.acceptedUser?.matchStatus}
          </h4>
          <h4>
            Status Update At:{" "}
            {dayjs(
              data?.resultUpatedBy?.acceptedUser?.updatedAt
                ? data?.resultUpatedBy?.acceptedUser?.updatedAt
                : data?.updatedAt
            ).format("DD-MM-YYYY hh:mm:ss A")}
          </h4>
          <h4>Proof</h4>
          <img
            src={data?.resultUpatedBy?.acceptedUser?.screenShot}
            style={{ height: "10em", width: "15em", cursor: "pointer" }}
            onClick={() =>
              handleImageClick(data?.resultUpatedBy?.acceptedUser?.screenShot)
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "12rem",
        }}
      >
        <Button variant="contained" onClick={handleUpdate}>
          Update Result
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Image Preview
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={imageSrc}
            alt="Proof Screenshot"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamePageAdmin;
