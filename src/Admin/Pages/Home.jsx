import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { adminDashboard } from "../../API/API";
import dayjs from "dayjs";
import { Paper } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const OverviewCard = ({ title, stats, isSmallScreen }) => {
  return (
    <Paper
      elevation={10}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "10px",
        color: "white",
      }}
      className={(() => {
        if (title === "All User Overview") {
          return "all-user-overview";
        } else if (title === "Deposit Overview") {
          return "deposite-overview";
        } else if (title === "Challenge Overview") {
          return "challenge-overview";
        } else if (title === "Withdrawal Request Overview") {
          return "withdrawal-overview";
        } else if (title === "All user details") {
          return "commision-overview";
        }
      })()}
    >
      <h1 style={{ fontFamily: "cursive" }}>{title}</h1>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexDirection: `${isSmallScreen ? "column" : "row"}`,
        }}
        className={title === "All user details" && "gridCommision"}
      >
        {Object.entries(stats).map(([key, value]) => (
          <Paper elevation={10} key={key} className="overview-card">
            {(() => {
              if (title === "All User Overview") {
                return (
                  <AdminPanelSettingsIcon
                    fontSize="large"
                    style={{ color: "green" }}
                  />
                );
              } else if (title === "Deposit Overview") {
                return (
                  <AssuredWorkloadIcon
                    fontSize="large"
                    style={{ color: "orange" }}
                  />
                );
              } else if (title === "Challenge Overview") {
                return (
                  <VideogameAssetIcon
                    fontSize="large"
                    style={{ color: "red" }}
                  />
                );
              } else if (title === "Withdrawal Request Overview") {
                return (
                  <AddCardIcon fontSize="large" style={{ color: "blue" }} />
                );
              } else if (title === "All user details") {
                return (
                  <PeopleIcon fontSize="large" style={{ color: "green" }} />
                );
              }
            })()}
            <div
              style={{
                // fontFamily: "cursive",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              {value}
            </div>
          </Paper>
        ))}
      </div>
    </Paper>
  );
};

const AdminHome = () => {
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataFilter, setDataFilter] = useState({
    fromDate: "",
    toDate: "",
    checked: false,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await adminDashboard(dataFilter);
      setData(response.data.data || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataFilter]);

  const handleTodayFilterToggle = () => {
    const today = dayjs().format("YYYY-MM-DD");
    setDataFilter((prevFilter) => ({
      fromDate: today,
      toDate: today,
      checked: !prevFilter.checked,
    }));
  };

  const overviewData = [
    {
      title: "All User Overview",
      stats: {
        [`${dataFilter.checked ? "Today" : "Total"} Admin`]:
          data?.totalAdmins || 0,
        [`${dataFilter.checked ? "Today" : "Total"} User`]:
          data?.totalUsers || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Active User`]:
          data?.activeUsers || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Blocked User`]:
          data?.blockedUsers || 0,
      },
    },
    {
      title: "Deposit Overview",
      stats: {
        [`${dataFilter.checked ? "Today" : "Total"} Request`]:
          data?.totalTransactions || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Deposit`]: `₹${
          data?.totalDeposits || 0
        }`,
        "Pending Request": data?.pendingDepositTransaction || 0,
        "Rejected Request": data?.rejectedDepositRequest || 0,
      },
    },
    {
      title: "Challenge Overview",
      stats: {
        [`${dataFilter.checked ? "Today" : "Total"} Complete Challenge`]:
          data?.completedBattles || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Active Challenge`]:
          data?.activeBattles || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Ongoing Challenge`]:
          data?.ongoingBattles || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Cancelled Challenge`]:
          data?.cancelledBattles || 0,
      },
    },
    {
      title: "Withdrawal Request Overview",
      stats: {
        [`${dataFilter.checked ? "Today" : "Total"} Request`]:
          data?.totalWithdrawRequest || 0,
        [`${dataFilter.checked ? "Today" : "Total"} Withdrawal`]: `₹${
          data?.totalWithdraw || 0
        }`,
        "Pending Request": data?.pendingWithdrawalTransaction || 0,
        "Rejected Request": data?.rejectedWithdrawalRequest || 0,
      },
    },
    {
      title: "All user details",
      stats: {
        [`${dataFilter.checked ? "Today" : "Total"} Commission`]: `₹${
          data?.totalCommission || 0
        }`,
        "Total Wallet Balance": `₹${data?.totalWalletBalance || 0}`,
        "Total Bonus Amount": `₹${data?.totalBonus || 0}`,
        "Total Referral Amount": `₹${data?.totalReferralAmountUser || 0}`,
        "Pending Referral Amount": `₹${data?.pendingReferralAmount || 0}`,
        "Hold Balance": `₹${data?.holdBalance || 0}`,
        "Total Penalty": `₹${data?.totalPenalty || 0}`,
      },
    },
  ];

  const mediaData = useMediaQuery("(max-width:768px)");

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ paddingLeft: `${mediaData ? "2rem" : "unset"}` }}>
          {localStorage.getItem("userRole") === "superAdmin"
            ? "Welcome Super Admin!"
            : "Welcome Admin!"}
        </h1>
        <div>
          <span>Today Filter</span>
          <Switch
            {...label}
            color="success"
            checked={dataFilter.checked}
            onChange={handleTodayFilterToggle}
          />
        </div>
      </header>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <iframe
            src="https://lottie.host/embed/b0a7f26d-ad25-490f-9094-4cc2d57d98eb/IBq1khLS2C.lottie"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "2rem",
            padding: "0 2rem",
            marginBottom: "6rem",
          }}
        >
          {overviewData.map((section, index) => (
            <OverviewCard
              key={index}
              title={section.title}
              stats={section.stats}
              isSmallScreen={isSmallScreen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
