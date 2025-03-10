import React, { useEffect, useState } from "react";
import { adminTournamentGet } from "../../API/API";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminTournament = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("PLAYING");
  const nav = useNavigate();

  const getData = async () => {
    const response = await adminTournamentGet();
    setData(response.data.data);
  };

  useEffect(() => {
    const inetrvalData = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(inetrvalData);
  }, []);

  const filteredData =
    filter === "All"
      ? data
      : data.filter(
          (item) => item.status === filter || item.matchStatus === filter
        );

  const mediaData = useMediaQuery("(max-width:768px)");

  return (
    <div>
      <div
        style={{
          paddingLeft: `${mediaData ? "2rem" : "unset"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "2rem",
        }}
      >
        <h1>Admin Tournament</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: `${mediaData ? "unset" : "1rem"}` }}
        >
          <option value="All">All</option>
          <option value="PLAYING">PLAYING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="OPEN">OPEN</option>
          <option value="CONFLICT">CONFLICT</option>
        </select>
      </div>
      <div>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            paddingLeft: `${mediaData ? "2rem" : "unset"}`,
          }}
        >
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Battle ID
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Status
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Winner Amount
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Room No
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Entry Fee
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Created By
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  Accepted By
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
                filteredData.map((request, index) => (
                  <TableRow key={request?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {(() => {
                        if (request?.matchStatus === "CANCELLED") {
                          return request?.matchStatus;
                        } else if (request?.status === "CLOSED") {
                          return "COMPLETED";
                        } else {
                          request?.status;
                        }
                      })()}
                    </TableCell>
                    <TableCell>{request?.winnerAmount}</TableCell>
                    <TableCell>{request?.roomNo || "NA"}</TableCell>
                    <TableCell>{request?.entryFee}</TableCell>
                    <TableCell
                      onClick={() =>
                        navigate(
                          `/admin/secure/user-details/${request?.createdBy?._id}`
                        )
                      }
                      style={{ cursor: "pointer", color: "#034694" }}
                    >
                      {request?.createdBy?.name}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        navigate(
                          `/admin/secure/user-details/${request?.acceptedBy?._id}`
                        )
                      }
                      style={{ cursor: "pointer", color: "#034694" }}
                    >
                      {request?.acceptedBy?.name}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: "10px" }}
                        onClick={() =>
                          nav(
                            `/admin/secure/tournaments/result?id=${request?._id}`
                          )
                        }
                      >
                        View
                      </Button>
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
      </div>
    </div>
  );
};

export default AdminTournament;
