import * as React from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { adminTransaction, adminTransactionApprove } from "../../API/API";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminRecharge() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]); // All data
  const [filteredData, setFilteredData] = React.useState([]); // Filtered data
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [loading, setLoading] = React.useState({
    loadData: false,
    id: null,
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("All"); // State for dropdown filter

  const getData = async () => {
    try {
      const response = await adminTransaction("deposit");
      const transactionList = response.data.data.transactionList || [];
      setData(transactionList);
      setFilteredData(transactionList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(
      (item) =>
        (filterStatus === "All" ||
          item?.status?.toLowerCase() === filterStatus.toLowerCase()) &&
        item?.userId?.mobileNo?.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  };

  const handleFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);

    const filtered = data.filter(
      (item) =>
        (selectedStatus === "All" ||
          item?.status?.toLowerCase() === selectedStatus.toLowerCase()) &&
        item?.userId?.mobileNo?.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage("");
  };

  const handleAccept = async (data, value) => {
    setLoading({ id: data, loadData: true });
    try {
      const response = await adminTransactionApprove({
        transactionId: data,
        isApproved: value,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading({ id: null, loadData: false });
      setFilterStatus("All");
      getData();
    } catch (error) {
      console.error("Error accepting image:", error);
      toast.error(error.response.data.message);
      setLoading({ id: null, loadData: false });
    }
  };

  return (
    <Box sx={{ padding: "20px", height: "calc(100vh - 100px)" }}>
      <Typography variant="h4" gutterBottom>
        Recharge
      </Typography>
      <Box
        sx={{
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <select
          style={{ padding: "10px", fontSize: "16px" }}
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Successful</option>
          <option value="rejected">Rejected</option>
        </select>
        <TextField
          label="Search by Mobile Number"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
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
                User Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Mobile Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                UPI ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                TransactionId/UTR
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Created Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Screenshot
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length > 0 ? (
              filteredData.map((request) => (
                <TableRow key={request?._id}>
                  <TableCell>{request?._id}</TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/secure/user-details/${request?.userId?._id}`
                      )
                    }
                    style={{ cursor: "pointer", color: "#034694" }}
                  >
                    {request?.userId?.name}
                  </TableCell>
                  <TableCell>{request?.userId?.mobileNo}</TableCell>
                  <TableCell>{request?.adminUPIId}</TableCell>
                  <TableCell>{request?.amount}</TableCell>
                  <TableCell>
                    {request?.status === "approved"
                      ? "successful"
                      : request?.status}
                  </TableCell>
                  <TableCell>{request?.utrNo}</TableCell>
                  <TableCell>
                    {dayjs(request?.createdAt).format("DD-MM-YYYY") +
                      " " +
                      dayjs(request?.createdAt).format("hh:mm:ss A")}
                  </TableCell>
                  <TableCell>
                    <img
                      src={request?.screenShot}
                      alt="Screenshot"
                      style={{ height: "5em", cursor: "pointer" }}
                      onClick={() => handleOpenModal(request?.screenShot)}
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
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: "10px" }}
                          onClick={() => handleAccept(request?._id, true)}
                          disabled={
                            request?.status === "approved" ||
                            request?.status === "rejected"
                          }
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: "10px", backgroundColor: "red" }}
                          onClick={() => handleAccept(request?._id, false)}
                          disabled={
                            request?.status === "approved" ||
                            request?.status === "rejected"
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No More...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Screenshot
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Selected Screenshot"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
