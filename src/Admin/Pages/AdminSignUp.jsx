import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
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
import { adminSignup } from "../../API/API";
const theme = createTheme();

export default function AdminSignUp() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const handleSignUp = async () => {
    setLoading(true);
    if (
      !payload.name ||
      !payload.email ||
      !payload.password ||
      !payload.mobileNo
    ) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    const response = await adminSignup(payload);
    if (response.data.statusCode === 200) {
      toast.success(response.data.message);
      nav("/admin/secure/home");
    } else {
      toast.error(response.response.data.message);
      setLoading(false);
    }
    setLoading(false);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Admin Account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="name"
              id="name"
              label="Enter Name"
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              name="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              label="Email Mobile Number"
              onChange={(e) =>
                setPayload({ ...payload, mobileNo: e.target.value })
              }
              name="mobileNo"
              autoComplete="mobileNo"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!loading ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignUp}
              >
                Add Account
              </Button>
            ) : (
              <button className="login-page-btn-primary">
                <CircularProgress size="30px" />
              </button>
            )}
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
