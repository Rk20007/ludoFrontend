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

  const tableScrollRef = React.useRef(null);
  const bottomScrollRef = React.useRef(null);
  const bottomInnerRef = React.useRef(null);
  const scrollSyncLock = React.useRef(false);
  const [hasHorizontalScroll, setHasHorizontalScroll] = React.useState(false);

  const updateHorizontalScrollMetrics = React.useCallback(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const need = el.scrollWidth > el.clientWidth + 1;
    setHasHorizontalScroll(need);
    if (bottomInnerRef.current) {
      bottomInnerRef.current.style.minWidth = `${el.scrollWidth}px`;
    }
  }, []);

  React.useLayoutEffect(() => {
    updateHorizontalScrollMetrics();
  }, [filteredData, data, updateHorizontalScrollMetrics]);

  React.useEffect(() => {
    const onResize = () => updateHorizontalScrollMetrics();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateHorizontalScrollMetrics]);

  React.useEffect(() => {
    const el = tableScrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => updateHorizontalScrollMetrics());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateHorizontalScrollMetrics]);

  const onTableContainerScroll = React.useCallback((e) => {
    if (scrollSyncLock.current) return;
    scrollSyncLock.current = true;
    const left = e.currentTarget.scrollLeft;
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollLeft = left;
    }
    scrollSyncLock.current = false;
  }, []);

  const onBottomScrollStrip = React.useCallback((e) => {
    if (scrollSyncLock.current) return;
    scrollSyncLock.current = true;
    const left = e.currentTarget.scrollLeft;
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollLeft = left;
    }
    scrollSyncLock.current = false;
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ flexShrink: 0 }}>
        User Management
      </Typography>

      <TextField
        label="Search by Mobile Number, Name, or ID"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px", flexShrink: 0 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Paper
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TableContainer
          component={Box}
          ref={tableScrollRef}
          onScroll={onTableContainerScroll}
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
          }}
        >
          <Table
            aria-label="simple table"
            stickyHeader
            sx={{ minWidth: "max-content" }}
          >
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

        <Box
          ref={bottomScrollRef}
          onScroll={onBottomScrollStrip}
          sx={{
            flexShrink: 0,
            overflowX: "auto",
            overflowY: "hidden",
            maxHeight: hasHorizontalScroll ? 18 : 0,
            opacity: hasHorizontalScroll ? 1 : 0,
            transition: "max-height 0.15s ease",
            borderTop: hasHorizontalScroll ? "1px solid" : 0,
            borderColor: "divider",
            "&::-webkit-scrollbar": { height: 12 },
          }}
        >
          <Box ref={bottomInnerRef} sx={{ height: 1, width: 1 }} aria-hidden />
        </Box>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          flexShrink: 0,
          mt: 2,
          py: 1.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Total users: {data.length}
          {searchTerm.trim()
            ? ` · Matching filter: ${filteredData.length}`
            : null}
        </Typography>
      </Paper>

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
