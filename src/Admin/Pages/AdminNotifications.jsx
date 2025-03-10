import React, { useState, useEffect } from "react";
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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { adminAllUsers, adminSendNotification } from "../../API/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessage] = useState("");

  const getallUsers = async () => {
    const response = await adminAllUsers();
    setData(response.data.data);
  };

  useEffect(() => {
    getallUsers();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setMessageTitle("");
  };

  const handleSendMessage = async () => {
    if (messageTitle.trim() === "") {
      alert("Please enter a message title");
      return;
    }
    const response = await adminSendNotification({
      title: messageTitle,
      message: messageBody,
      userId: selectedUser._id,
    });
    if (response.data.statusCode === 201) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    handleClose();
  };

  return (
    <div style={{ padding: "20px", height: "calc(100vh - 100px)" }}>
      <h1>Admin Notifications</h1>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "calc(100vh - 200px)",
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
                User Mobile Number
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
              data.map((user) => (
                <TableRow key={user._id}>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {user._id}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(`/admin/secure/user-details/${user?._id}`)
                    }
                    style={{
                      cursor: "pointer",  
                      color: "#034694",
                      fontWeight: "bold",
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "brown" }}>
                    {user.mobileNo}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(user)}
                    >
                      Send Message
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No More...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Send a message to <b>{selectedUser?.name}</b>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Message Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setMessageTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminNotifications;
