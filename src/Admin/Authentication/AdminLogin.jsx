import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { adminLogin } from "../../API/API";
import Cookies from "js-cookie";
const theme = createTheme();

export default function AdminLogin() {
  const nav = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!payload.email || !payload.password) {
      setLoading(false);
      return;
    } else {
      const getResponse = await adminLogin(payload);
      if (getResponse.status === 500) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }
      if (getResponse?.response?.data?.message) {
        toast.error(
          getResponse?.response?.data?.message?.email ||
            getResponse?.response?.data?.message?.password ||
            getResponse?.response?.data?.message
        );
        setLoading(false);
        return;
      }

      if (getResponse?.data?.statusCode === 200) {
        localStorage.setItem("userRole", getResponse.data?.data.user.role);
        localStorage.setItem("userId", getResponse.data?.data.user._id);
        Cookies.set("verifyToken", getResponse.data?.data.token);
        toast.success(getResponse?.data?.message);
        nav("/admin/secure/home");
      }
      setLoading(false);
      return;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src="/mainLogoRing.png" style={{ height: "180px" }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
              value={payload.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              value={payload.password}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {!loading ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
            ) : (
              <button className="login-page-btn-primary">
                <CircularProgress size="30px" />
              </button>
            )}
            <Grid container>
              {/* <Grid item xs>
                <Link href="/admin/signup" variant="body2">
                  Create Admin Account
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit">Ring Ludo</Link> {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
