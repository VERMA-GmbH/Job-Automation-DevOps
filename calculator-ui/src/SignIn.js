import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../WalletOperationsService";
import AlertDialog from "./AlertDialog";
import { ERROR } from "../constants";
const theme = createTheme();

export default function SignIn(props) {
  const [signInState, setSignInState] = React.useState({});
  const { signInCallback } = props;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("username");
    const password = data.get("password");

    if (userName && password) {
      setSignInState({
        ...signInState,
        errorMessagePWD: undefined,
        errorMessageUN: undefined,
      });
      await signIn({
        username: userName,
        password: password,
      })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
            sessionStorage.setItem("access_token", res.data.token);
            signInCallback();
          }
        })
        .catch((err) => {
          console.log(err);
          const msg = err?.response?.data?.message
            ? err?.response?.data?.message
            : "Internal server error";
          setSignInState({
            ...signInState,
            errorMessageAPI: msg,
            snackBar: true,
            severity: ERROR,
            message: msg,
          });
        });
    } else {
      if (!userName || userName.length === 0) {
        setSignInState({
          ...signInState,
          errorMessageUN: "Please enter username!",
        });
      }
      if (!password || password.length === 0) {
        setSignInState({
          ...signInState,
          errorMessagePWD: "Please enter password!",
        });
      }
    }
  };
  const alertCallback = () => {
    setSignInState({
      ...signInState,
      snackBar: false,
      severity: undefined,
      message: undefined,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      {signInState.snackBar && (
        <AlertDialog
          open={signInState.snackBar}
          severity={signInState.severity}
          message={signInState.message}
          alertCallback={alertCallback}
        />
      )}
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              error={signInState.errorMessageUN}
              helperText={signInState.errorMessageUN}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={signInState.errorMessagePWD}
              helperText={signInState.errorMessagePWD}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
