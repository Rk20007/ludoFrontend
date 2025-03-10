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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AdminGameHistory = ({ data }) => {
  const nav = useNavigate();
  return (
    <div style={{ paddingTop: "2rem" }}>
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
                Creator
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Accepter
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Win/Lose Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Closing Balance
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Type
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Winner
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Date & Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.battles?.length > 0 ? (
              data.battles?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?._id}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/secure/user-details/${request?.createdBy?._id}`
                      )
                    }
                    style={{
                      cursor: "pointer",
                      color: "#034694",
                      fontWeight: "bold",
                    }}
                  >
                    {request?.createdBy?.name}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      navigate(
                        `/admin/secure/user-details/${request?.acceptedBy?._id}`
                      )
                    }
                    style={{
                      cursor: "pointer",
                      color: "#034694",
                      fontWeight: "bold",
                    }}
                  >
                    {request?.acceptedBy?.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request?.entryFee}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request?.winnerAmount}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request?.isBattleCreatedByUser
                      ? request?.closingBalanceCreater
                      : request?.closingBalanceAccepter || 0}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
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
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {"Ludo Classic"}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request?.winner?.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {`${dayjs(request?.updatedAt).format("DD/MM/YYYY h:mm A")}`}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    <Button
                      variant="contained"
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
                <TableCell colSpan={9} align="center">
                  No More...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminGameHistory;
