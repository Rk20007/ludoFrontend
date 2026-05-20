import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  readPaymentReturnFromSearch,
  resolveQrImageSrc,
} from "../../util/paymentGateway";
import { startGatewayDeposit } from "../../util/startGatewayDeposit";

const gatewayEnabled = import.meta.env.VITE_USE_GATEWAY_RECHARGE !== "false";

const RechargeSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amountParam = new URLSearchParams(window.location.search).get("amount");
  const amountNum = Number(amountParam);

  const [booting, setBooting] = useState(false);
  const [orderMeta, setOrderMeta] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const skipRemoteCreateRef = useRef(false);

  useEffect(() => {
    const ret = readPaymentReturnFromSearch(window.location.search);
    if (ret.success) {
      setSuccessOpen(true);
      return undefined;
    }
    if (ret.failed) {
      toast.error("Payment failed or was cancelled");
      navigate("/addcash", { replace: true });
      return undefined;
    }

    if (location.state?.orderMeta) {
      setOrderMeta(location.state.orderMeta);
      skipRemoteCreateRef.current = true;
      navigate(`${location.pathname}${location.search}`, { replace: true });
      return undefined;
    }

    if (skipRemoteCreateRef.current) {
      return undefined;
    }

    if (!gatewayEnabled) {
      toast.error("Online payment is not enabled");
      navigate("/addcash", { replace: true });
      return undefined;
    }

    if (!amountParam || Number.isNaN(amountNum) || amountNum < 1) {
      toast.error("Amount should be at least ₹50");
      navigate("/addcash", { replace: true });
      return undefined;
    }

    let cancelled = false;

    const run = async () => {
      setBooting(true);
      const { payUrl, meta, error } = await startGatewayDeposit(amountNum);
      if (cancelled) return;

      if (error) {
        toast.error(error);
        setBooting(false);
        navigate("/addcash", { replace: true });
        return;
      }

      if (payUrl) {
        setBooting(false);
        toast.success("Redirecting to secure payment…");
        window.location.assign(payUrl);
        return;
      }

      setOrderMeta(meta);
      setBooting(false);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [amountParam, amountNum, navigate, location.key]);

  const qrSrc = orderMeta ? resolveQrImageSrc(orderMeta.qrImage) : null;

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/wallet", { replace: true });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={booting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={successOpen} onClose={handleSuccessClose} disableEscapeKeyDown={false}>
        <DialogTitle>Payment successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your wallet has been updated. You can continue from your wallet or home.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSuccessClose} fullWidth sx={{ m: 1 }}>
            Go to wallet
          </Button>
        </DialogActions>
      </Dialog>

      {!booting && orderMeta && (
        <Box sx={{ px: 2, py: 3, maxWidth: 420, mx: "auto" }}>
          <Typography variant="h6" gutterBottom align="center">
            Complete payment
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
            Pay ₹{amountParam} using the options below.
          </Typography>
          {qrSrc && (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <img src={qrSrc} style={{ maxWidth: "100%", height: "auto" }} alt="Payment QR" />
            </Box>
          )}
          {orderMeta.upiLink && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button variant="contained" onClick={() => (window.location.href = orderMeta.upiLink)}>
                Open UPI app
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(orderMeta.upiLink);
                  toast.success("UPI link copied");
                }}
              >
                Copy UPI link
              </Button>
            </Box>
          )}
          <Button sx={{ mt: 2 }} fullWidth onClick={() => navigate("/addcash")}>
            Back to add cash
          </Button>
        </Box>
      )}
    </>
  );
};

export default RechargeSubmit;
