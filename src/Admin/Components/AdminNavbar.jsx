import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  AttachMoney as AttachMoneyIcon,
  ArrowDownward as ArrowDownwardIcon,
  EmojiEvents as EmojiEventsIcon,
    QrCodeScanner as QrCodeScannerIcon,
  Percent as PercentIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  VerifiedUser as VerifiedUserIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import Cookies from "js-cookie";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminNavbar() {
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname.split("/");

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("verifyToken");
    window.location.href = "/admin/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {path.includes("secure") && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Admin panel
            </Typography>
            {path.includes("secure") && (
              <Typography variant="h6" noWrap component="div">
                Hi, {localStorage.getItem("admin_name") || "Admin"}
              </Typography>
            )}
            {path.includes("secure") && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={handleLogout}
              >
                Logout
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {path.includes("secure") && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
  {[
    { text: "Dashboard", path: "/admin/secure/home", isShow: true, icon: <DashboardIcon /> },
    { text: "Recharge", path: "/admin/secure/recharge", isShow: true, icon: <AttachMoneyIcon /> },
    {
      text: "Withdraw",
      path: "/admin/secure/withdraw",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <ArrowDownwardIcon />
    },
    { text: "Matches", path: "/admin/secure/tournaments", isShow: true, icon: <EmojiEventsIcon /> },
    {
      text: "Update QR Code",
      path: "/admin/secure/update-qr",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <QrCodeScannerIcon />
    },
    {
      text: "Set Percentage",
      path: "/admin/secure/set-percentage",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <PercentIcon />
    },
    {
      text: "Notifications",
      path: "/admin/secure/notifications",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <NotificationsIcon />
    },
    {
      text: "Social Media Links",
      path: "/admin/secure/socialMedia",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <LanguageIcon />
    },
    { text: "KYC Verification", path: "/admin/secure/kyc", isShow: true, icon: <VerifiedUserIcon /> },
    {
      text: "Add Admin Account",
      path: "/admin/secure/signup",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <PersonAddIcon />
    },
    {
      text: "User List",
      path: "/admin/secure/user-management",
      isShow: localStorage.getItem("userRole") === "superAdmin" ? true : false,
      icon: <GroupIcon />
    }
  ].map((item, index) => (
    <ListItem key={item.text} disablePadding sx={{ display: `${item.isShow ? "block" : "none"}` }}>
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5
        }}
        onClick={() => setOpen(false)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center"
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

          <Divider />
        </Drawer>
      )}
    </Box>
  );
}
