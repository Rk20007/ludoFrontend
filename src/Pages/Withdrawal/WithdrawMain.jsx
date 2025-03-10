import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { withdrawAPI } from "../../API/API";
import toast from "react-hot-toast";

const WithdrawMain = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState({
    upi: false,
    bank: false,
  });
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    mobilenumber: "",
    accoountNumber: 0,
    bankName: "",
    upiID: "",
    ISFCode: "",
    amount: "",
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (payload.mobilenumber.length !== 10) {
      toast.error("Please enter a valid mobile number");
      setLoading(false);
      return;
    }
    if (
      payload.name === "" ||
      payload.mobilenumber === "" ||
      payload.amount === ""
    ) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    } else {
      if (value.bank) {
        if (!payload.bankName || !payload.accoountNumber || !payload.ISFCode) {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
        const payData = {
          amount: payload.amount,
          type: "withdraw",
          paymentMethod: "bankAccount",
          bankAccountDetails: {
            bankName: payload.bankName,
            accountNumber: payload.accoountNumber,
            ifscCode: payload.ISFCode,
          },
          userDetails: {
            name: payload.name,
            mobileNo: payload.mobilenumber,
          },
        };

        const response = await withdrawAPI(payData);
        if (response?.status === 400 || response?.data?.status === 400) {
          toast.error(response?.response?.data?.message);
          setLoading(false);
          return;
        } else {
          const response = await withdrawAPI(payData);
          if (
            response.data.statusCode === 201 ||
            response.data.statusCode === 200
          ) {
            toast.success(response.data.message);
            navigate("/transaction-history");
          }
        }
        setLoading(false);
      } else if (value.upi) {
        if (!payload.upiID) {
          toast.error("Please enter upi id");
          setLoading(false);
          return;
        }
        const payData = {
          amount: payload.amount,
          type: "withdraw",
          paymentMethod: "upi",
          upiId: payload.upiID,
          userDetails: {
            name: payload.name,
            mobileNo: payload.mobilenumber,
          },
        };

        const response = await withdrawAPI(payData);
        if (response?.status === 400 || response?.data?.status === 400) {
          toast.error(response?.response?.data?.message);
          setLoading(false);
          return;
        } else {
          const response = await withdrawAPI(payData);
          if (
            response.data.statusCode === 201 ||
            response.data.statusCode === 200
          ) {
            toast.success(response.data.message);
            navigate("/transaction-history");
          }
        }
        setLoading(false);
      }
    }
  };

  return (
    <section className="addBank-section">
      <div className="withdraw-section-title">Withdraw Money</div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <DriveFileRenameOutlineIcon
          sx={{ color: "action.active", mr: 1, my: 0.5 }}
        />
        <TextField
          id="input-with-sx"
          label="Enter Your Name"
          variant="standard"
          fullWidth
          name="name"
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}>
        <MobileScreenShareIcon
          sx={{ color: "action.active", mr: 1, my: 0.5 }}
        />
        <TextField
          id="input-with-sx"
          label="Enter Mobile Number"
          variant="standard"
          fullWidth
          name="mobilenumber"
          onChange={handleChange}
          type="number"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}>
        <CurrencyRupeeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Enter Amount"
          variant="standard"
          fullWidth
          type="number"
          onChange={handleChange}
          name="amount"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingTop: "20px",
          paddingLeft: "10px",
        }}
      >
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="UPI Payment"
              control={<Radio />}
              label="UPI"
              onChange={() => setValue({ upi: true, bank: false })}
            />
            <FormControlLabel
              value="Bank Payment"
              control={<Radio />}
              label="Bank Account"
              onChange={() => setValue({ upi: false, bank: true })}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {value.bank && (
        <>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}
          >
            <TravelExploreIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="input-with-sx"
              label="Enter IFSC Code"
              variant="standard"
              fullWidth
              onChange={handleChange}
              name="ISFCode"
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}
          >
            <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter Bank Name"
              variant="standard"
              fullWidth
              name="bankName"
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}
          >
            <ContactPageIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Enter Account Number"
              variant="standard"
              fullWidth
              onChange={handleChange}
              name="accoountNumber"
            />
          </Box>
        </>
      )}
      {value.upi && (
        <Box
          sx={{ display: "flex", alignItems: "flex-end", paddingTop: "20px" }}
        >
          <AlternateEmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Enter UPI ID"
            variant="standard"
            fullWidth
            name="upiID"
            onChange={handleChange}
          />
        </Box>
      )}
      <Box
        sx={{ paddingTop: "35px", display: "flex", justifyContent: "center" }}
      >
        {!loading ? (
          <Button variant="contained" onClick={handleSubmit}>
            Continue
          </Button>
        ) : (
          <Button variant="contained" disabled>
            please wait...
          </Button>
        )}
      </Box>
    </section>
  );
};

export default WithdrawMain;
