import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Cookies from "js-cookie";

export default function NavDrawer({ isOpen, toggleDrawer }) {
  const navigate = useNavigate();

  const menuItemsWithoutLogin = [
    {
      text: "Help & Support",
      icon: <HelpOutlineOutlinedIcon />,
      route: "/support",
    },
    {
      text: "Privacy Policy",
      icon: <PrivacyTipOutlinedIcon />,
      route: "/privacy-policy",
    },
    {
      text: "Terms & Conditions",
      icon: <GavelOutlinedIcon />,
      route: "/terms",
    },
    {
      text: "Responsible Gaming",
      icon: <SportsEsportsOutlinedIcon />,
      route: "/responsible-gaming",
    },
  ];
  const menuItemsWithLogin = [
    {
      text: "My Profile",
      icon: <PersonOutlineOutlinedIcon />,
      route: "/profile",
    },
    {
      text: "Win Cash",
      icon: <ShoppingCartCheckoutOutlinedIcon />,
      route: "/tournaments",
    },
    {
      text: "My Wallet",
      icon: <AccountBalanceWalletOutlinedIcon />,
      route: "/wallet",
    },
    {
      text: "Game History",
      icon: <ScheduleOutlinedIcon />,
      route: "/Gamehistory",
    },
    {
      text: "Transaction History",
      icon: <AccountBalanceOutlinedIcon />,
      route: "/transaction-history",
    },
    {
      text: "Refer History",
      icon: <Diversity3OutlinedIcon />,
      route: "/Referral-history",
    },
    {
      text: "Refer & Earn",
      icon: <SettingsAccessibilityOutlinedIcon />,
      route: "/refer-earn",
    },
    {
      text: "Notification",
      icon: <NotificationsActiveOutlinedIcon />,
      route: "/Notification",
    },
    {
      text: "Help & Support",
      icon: <HelpOutlineOutlinedIcon />,
      route: "/support",
    },
    {
      text: "Privacy Policy",
      icon: <PrivacyTipOutlinedIcon />,
      route: "/privacy-policy",
    },
    {
      text: "Terms & Conditions",
      icon: <GavelOutlinedIcon />,
      route: "/terms",
    },
    {
      text: "Responsible Gaming",
      icon: <SportsEsportsOutlinedIcon />,
      route: "/responsible-gaming",
    },
    {
      text: "Logout",
      icon: <LockOutlinedIcon />,
      route: "/logout",
    },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    toggleDrawer(false)();
  };

  const DrawerList = (
    <Box
      sx={{
        width: 350,
        height: "100%",
        backgroundColor: "black",
        // backgroundImage: "radial-gradient(circle, rgba(134,57,182,1) 0%, rgba(0,95,255,1) 100%)",
        color: "white",
        overflowY: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <img
            src="/mainLogoRing.png"
            alt="Logo"
            style={{
              height: "2.8rem",
            }}
          />
        </Box>
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ color: "white" }}
          aria-label="close drawer"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ overflowY: "scroll", scrollbarWidth: "none" }}>
        {(Cookies.get("verifyToken")
          ? menuItemsWithLogin
          : menuItemsWithoutLogin
        ).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.route)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: "white", fontSize: "18px !important" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
