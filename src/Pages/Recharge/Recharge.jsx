import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import RechargeTop from "../../Components/Card/RechargeTop";
import RechargeMain from "./RechargeMain";
import { readPaymentReturnFromSearch } from "../../util/paymentGateway";

const Recharge = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.toString() ? `?${searchParams.toString()}` : "";
    const { success, failed } = readPaymentReturnFromSearch(q);
    if (success) {
      setSuccessOpen(true);
      setSearchParams({}, { replace: true });
      return;
    }
    if (failed) {
      toast.error("Payment failed or was cancelled");
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/wallet", { replace: true });
  };

  return (
    <div className="recharge-main">
      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>Payment successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your wallet has been updated. You can continue from your wallet.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSuccessClose} fullWidth sx={{ m: 1 }}>
            Go to wallet
          </Button>
        </DialogActions>
      </Dialog>
      <RechargeTop />
      <RechargeMain />
    </div>
  );
};

export default Recharge;
