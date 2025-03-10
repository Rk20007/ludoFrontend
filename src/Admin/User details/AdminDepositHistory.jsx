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
import dayjs from "dayjs";

const AdminDepositHistory = ({ data }) => {
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
                Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Type
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
                Payment Gateway
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.depositHistory?.length > 0 ? (
              data.depositHistory?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?._id}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?.amount}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?.type}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?.closingBalance || 0}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request?.status === "approved"
                      ? "successful"
                      : request?.status}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {"Manual"}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {`${dayjs(request?.updatedAt).format("DD/MM/YYYY h:mm A")}`}
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

export default AdminDepositHistory;
