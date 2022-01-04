import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/userSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({ name: "", id: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  if (isLogin) {
    console.log("masuk");
    console.log(isLogin);
    navigate("/");
  }
  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
    setLoading(true);
    axios
      .post(
        `https://virtserver.swaggerhub.com/sauronackerman/Ofspace/1.0.0/users/login`,
        {
          headers: { accept: "*/*", "Content-Type": "application/json" },
        },
        {
          data: {
            email: email,
            password: password,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          login({
            name: response.data.name,
            id: response.data.id,
            role: response.data.role,
            premium: response.data.premium,
            expired: response.data.expired,
          })
        );
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  };
  return (
    <Container
      variant="login"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        width: 800,
        backgroundColor: "#212121",
        borderRadius: "15px",
        padding: "20px",
        mt: 2,
      }}
    >
      <Box>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          // color="white"
          //   sx={{ textAlign: "center" }}
        >
          Welcome Back
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          // color="gray"
          //   sx={{ textAlign: "center" }}
        >
          Login with email
        </Typography>
        <FormControl fullWidth noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            autoFocus
            color="outline"
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            color="outline"
            variant="outlined"
          />
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link
                href="#"
                color="#ABABB1"
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          {loading && (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              color="primary"
            >
              Sign In
            </LoadingButton>
          )}
          {!loading && (
          <Button
            onClick={loginHandler}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          )}
          {error && (
          <Alert variant="standard" severity="error">
            Your email or password is wrong.
          </Alert>
          )}
        </FormControl>
      </Box>
    </Container>
  );
}
