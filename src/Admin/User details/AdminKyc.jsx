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

const AdminKyc = ({ data }) => {
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
                Doc Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Aadhar Number
              </TableCell>

              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Document Front
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Document Back
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Date & Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Approved By
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[data?.user?.kycDocument]?.length > 0 ? (
              [data?.user?.kycDocument]?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell style={{ fontWeight: "bold", color: "green" }}>
                    {request._id}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {request.name}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "brown" }}>
                    {request.aadharNumber}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "orange" }}>
                    <img src={request.frontPhoto} style={{ height: "9em" }} />
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "red" }}>
                    <img src={request.backPhoto} style={{ height: "9em" }} />
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "brown" }}>
                    {data?.user?.isKYCVerified === true
                      ? "Approved"
                      : "Pending"}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "blue" }}>
                    {`${dayjs(data?.user?.updatedAt).format(
                      "DD/MM/YYYY h:mm A"
                    )}`}
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                  >
                    Admin
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

export default AdminKyc;
