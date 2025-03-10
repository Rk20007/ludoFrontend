import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { adminKycDetails, adminKycRejectDetails, adminKycUpdateDetails } from "../../API/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const KycAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState({
    loadData: false,
    id: null,
  });

  // State for modal image
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleClickOpen = (src) => {
    setImageSrc(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const response = await adminKycDetails();
    setData(response.data.data);
  };

  const approveData = async (data) => {
    setLoading({ id: data, loadData: true });
    try {
      const response = await adminKycUpdateDetails(data);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        await getData();
      } else {
        toast.error(response.data.message);
      }
      setLoading({ id: null, loadData: false });
    } catch (error) {
      console.log("error", error);
      setLoading({ id: null, loadData: false });
      toast.error(error.response.data.message);
      return error;
    }
  };

  const rejectData = async (data) => {
    setLoading({ id: data, loadData: true });
    try {
      const response = await adminKycRejectDetails(data);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        await getData();
      } else {
        toast.error(response.data.message);
      }
      setLoading({ id: null, loadData: false });
    } catch (error) {
      console.log("error", error);
      setLoading({ id: null, loadData: false });
      toast.error(error.response.data.message);
      return error;
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1rem",
          alignItems: "flex-start",
        }}
      >
        <h1>KYC Requests</h1>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/secure/manual-kyc")}
        >
          Manual KYC
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "600px", overflow: "auto" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Mobile Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Aadhar Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Front Image
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Back Image
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request.kycDocument._id}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(`/admin/secure/user-details/${request?._id}`)
                    }
                    style={{
                      cursor: "pointer",
                      color: "#034694",
                      fontWeight: "bold",
                    }}
                  >
                    {request.kycDocument.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request.mobileNo}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "brown" }}>
                    {request.kycDocument.aadharNumber}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "orange" }}>
                    <img
                      src={request.kycDocument.frontPhoto}
                      style={{ height: "9em", cursor: "pointer" }}
                      onClick={() =>
                        handleClickOpen(request.kycDocument.frontPhoto)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "red" }}>
                    <img
                      src={request.kycDocument.backPhoto}
                      style={{ height: "9em", cursor: "pointer" }}
                      onClick={() =>
                        handleClickOpen(request.kycDocument.backPhoto)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {loading.id === request?._id && loading.loadData ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled
                        sx={{ marginRight: "10px" }}
                      >
                        <CircularProgress size={"30px"} />
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => approveData(request._id)}
                          sx={{ marginRight: "10px" }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => rejectData(request._id)}
                          sx={{ marginRight: "10px" }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No More...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
            alt="Document"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycAdmin;
