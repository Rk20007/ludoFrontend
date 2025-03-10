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
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { adminTransaction, adminTransactionApprove } from "../../API/API";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminWithdraw() {
  const getseacrhparams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [loading, setLoading] = React.useState({
    loadData: false,
    id: null,
  });

  React.useLayoutEffect(() => {
    const initialSearch = getseacrhparams.get("id") || "";
    setSearchQuery(initialSearch);
  }, []);

  const getData = async () => {
    try {
      const response = await adminTransaction("withdraw");
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

  React.useEffect(() => {
    let filtered = data;

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item?.userDetails?.mobileNo
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, statusFilter, searchQuery]);

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
      getData();
      setStatusFilter("All");
    } catch (error) {
      console.error("Error accepting transaction:", error);
      toast.error(error.response?.data?.message || "Error occurred");
      setLoading({ id: null, loadData: false });
    }
  };

  return (
    <Box sx={{ padding: "20px", height: "calc(100vh - 100px)" }}>
      <Typography variant="h4" gutterBottom>
        Withdraw
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "calc(100vh - 250px)",
          overflowY: "auto",
        }}
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
                Created Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Payment Method
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                UPI ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Bank Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                A/c Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                IFSC Code
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
                  <TableCell>{request?.amount}</TableCell>
                  <TableCell>
                    {request?.status === "approved"
                      ? "Successful"
                      : request?.status}
                  </TableCell>
                  <TableCell>
                    {dayjs(request?.createdAt).format("DD-MM-YYYY") +
                      " " +
                      dayjs(request?.createdAt).format("hh:mm:ss A")}
                  </TableCell>
                  <TableCell>{request?.paymentMethod}</TableCell>
                  <TableCell>{request?.upiId}</TableCell>
                  <TableCell>{request?.bankAccountDetails?.bankName}</TableCell>
                  <TableCell>
                    {request?.bankAccountDetails?.accountNumber}
                  </TableCell>
                  <TableCell>{request?.bankAccountDetails?.ifscCode}</TableCell>
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
                          color="secondary"
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
                <TableCell colSpan={11} align="center">
                  No More...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
