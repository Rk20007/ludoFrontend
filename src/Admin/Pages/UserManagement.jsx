import React from "react";
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  adminUserBlock,
  adminUserBonus,
  adminUserList,
  adminUserPenality,
} from "../../API/API";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [penalitySet, setPenalitySet] = React.useState({
    name: "",
    isSet: false,
    userId: "",
    amount: "",
    reason: "",
  });

  const [bonus, setBonus] = React.useState({
    userId: "",
    isSet: false,
    amount: "",
    name: "",
  });

  const getData = async () => {
    const response = await adminUserList();
    setData(response.data.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleBlockUser = async (value, id) => {
    try {
      const payload = {
        userId: id,
        block: value === "block" ? true : false,
      };
      const response = await adminUserBlock(payload);
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        await getData();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const handlePenality = async () => {
    if (
      penalitySet.amount === "" ||
      penalitySet.reason === "" ||
      penalitySet.userId === ""
    )
      return toast.error("Please fill all the fields");
    try {
      const response = await adminUserPenality({
        userId: penalitySet.userId,
        amount: penalitySet.amount,
        reason: penalitySet.reason,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        setPenalitySet({ ...penalitySet, isSet: false });
        await getData();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const handleBonus = async () => {
    try {
      const response = await adminUserBonus({
        userId: bonus.userId,
        amount: bonus.amount,
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        setBonus({ ...bonus, isSet: false });
        await getData();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  };

  const filteredData = data.filter((user) => {
    return (
      user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobileNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box sx={{ padding: "20px", height: "calc(100vh - 100px)" }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <TextField
        label="Search by Mobile Number, Name, or ID"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer
        component={Paper}
        style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}
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
                Mobile Number
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Active User
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Created Date
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
                  <TableCell>{request?.mobileNo}</TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(`/admin/secure/user-details/${request?._id}`)
                    }
                    style={{ cursor: "pointer", color: "#034694" }}
                  >
                    {request?.name}
                  </TableCell>
                  <TableCell>
                    {request?.isActive === true ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    {dayjs(request?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {request.isActive === true ? (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: "10px" }}
                          onClick={() => handleBlockUser("block", request._id)}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: "10px", backgroundColor: "gray" }}
                          onClick={() =>
                            handleBlockUser("unblock", request._id)
                          }
                        >
                          Unblock
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "10px", backgroundColor: "red" }}
                        onClick={() =>
                          setPenalitySet({
                            ...penalitySet,
                            isSet: true,
                            name: request?.name,
                            userId: request?._id,
                          })
                        }
                      >
                        Add penalty
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "10px", backgroundColor: "green" }}
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            isSet: true,
                            name: request?.name,
                            userId: request?._id,
                          })
                        }
                      >
                        Add Bonus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Results Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={penalitySet.isSet}
        onClose={() => setPenalitySet({ ...penalitySet, isSet: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Penalty for {penalitySet.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px", marginTop: "10px" }}
            onChange={(e) =>
              setPenalitySet({ ...penalitySet, amount: e.target.value })
            }
          />
          <TextField
            label="Reason"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            onChange={(e) =>
              setPenalitySet({ ...penalitySet, reason: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPenalitySet(false)}>Cancel</Button>
          <Button autoFocus variant="contained" onClick={handlePenality}>
            Add Penalty
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={bonus.isSet}
        onClose={() => setBonus({ ...bonus, isSet: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Bonus for {bonus.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px", marginTop: "10px" }}
            onChange={(e) => setBonus({ ...bonus, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBonus(false)}>Cancel</Button>
          <Button
            autoFocus
            variant="contained"
            onClick={handleBonus}
            sx={{ backgroundColor: "green" }}
          >
            Add Bonus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
