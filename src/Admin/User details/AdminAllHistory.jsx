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
import { useNavigate } from "react-router-dom";

const AdminAllHistory = ({ data }) => {
  const navigate = useNavigate();
  const gameHistory = data?.battles || [];
  const deposit = data?.depositHistory || [];
  const withdraw = data?.withdrawHistory || [];
  const refferData = data?.user?.referredUsers || [];

  const mergedArray = gameHistory.map((item, index) => ({
    game: item || {},
    deposit: deposit[index] || {},
    withdraw: withdraw[index] || {},
    refer: refferData[index] || {},
  }));

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
                Game Id
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Creator
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Accepter
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Win/Lose Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Winner
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Game Date & Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Deposit Id
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Deposit Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Deposit Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Deposit Date & Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Withdrawal Id
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Withdrawal Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Withdrawal Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Withdrawal Date & Time
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Referral Id
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Referral User
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Referral Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Referral Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mergedArray.length > 0 ? (
              mergedArray.map((item, index) => (
                <TableRow key={item.game._id || index}>
                  <TableCell>{item.game._id || "N/A"}</TableCell>
                  <TableCell
                    style={{ cursor: "pointer", color: "#034694" }}
                    onClick={() =>
                      navigate(
                        `/admin/secure/user-details/${item.game.createdBy?._id}`
                      )
                    }
                  >
                    {item.game.createdBy?.name || "N/A"}
                  </TableCell>
                  <TableCell
                    style={{ cursor: "pointer", color: "#034694" }}
                    onClick={() =>
                      navigate(
                        `/admin/secure/user-details/${item.game.acceptedBy?._id}`
                      )
                    }
                  >
                    {item.game.acceptedBy?.name || "N/A"}
                  </TableCell>
                  <TableCell>{item.game.entryFee || "N/A"}</TableCell>
                  <TableCell>{item.game.winnerAmount || "N/A"}</TableCell>
                  <TableCell>
                    {(() => {
                      if (item?.game?.matchStatus === "CANCELLED") {
                        return item?.game?.matchStatus;
                      } else if (item?.game?.status === "CLOSED") {
                        return "COMPLETED";
                      } else {
                        item?.game?.status;
                      }
                    })()}
                  </TableCell>
                  <TableCell>{item.game.winner?.name || "N/A"}</TableCell>
                  <TableCell>
                    {dayjs(item.game.updatedAt).format("DD/MM/YYYY h:mm A") ||
                      "N/A"}
                  </TableCell>
                  <TableCell>{item.deposit._id || "N/A"}</TableCell>
                  <TableCell>{item.deposit.amount || "N/A"}</TableCell>
                  <TableCell>{item.deposit.status || "N/A"}</TableCell>
                  <TableCell>
                    {dayjs(item.deposit.updatedAt).format(
                      "DD/MM/YYYY h:mm A"
                    ) || "N/A"}
                  </TableCell>
                  <TableCell>{item.withdraw._id || "N/A"}</TableCell>
                  <TableCell>{item.withdraw.amount || "N/A"}</TableCell>
                  <TableCell>{item.withdraw.status || "N/A"}</TableCell>
                  <TableCell>
                    {dayjs(item.withdraw.updatedAt).format(
                      "DD/MM/YYYY h:mm A"
                    ) || "N/A"}
                  </TableCell>
                  <TableCell>{item.refer._id || "N/A"}</TableCell>
                  <TableCell>{item.refer.userId?.name || "N/A"}</TableCell>
                  <TableCell>{item.refer.referralEarning || "N/A"}</TableCell>
                  <TableCell>
                    {dayjs(item.refer.updatedAt).format("DD/MM/YYYY h:mm A") ||
                      "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={20} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminAllHistory;
