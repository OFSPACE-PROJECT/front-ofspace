import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import { Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Regist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.persistedReducer.user.isLogin);
  console.log(isLogin)

  if (isLogin) {
    console.log("masuk");
    console.log(isLogin);
    navigate("/login");
  }
  const registerHandler = (e) => {
    console.log("masuk");
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `https://virtserver.swaggerhub.com/sauronackerman/Ofspace/1.0.0/users/register`,
        {
          headers: { accept: "*/*", "Content-Type": "application/json" },
        },
        {
          data: {
            name: name,
            role: "customer",
            password: password,
            email: email,
            phone: phone,
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

  const isLoading = loading;
  const isError = error;

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
          color="white"
          //   sx={{ textAlign: "center" }}
        >
          Create Account
        </Typography>
      </Box>
      <FormControl onSubmit={registerHandler} noValidate>
        <TextField
          margin="normal"
          fullWidth
          required
          id="name"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          autoComplete="name"
          autoFocus
          color="outline"
          variant="outlined"
        />
        <TextField
          margin="normal"
          fullWidth
          required
          id="phone"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          autoComplete="phone"
          autoFocus
          color="outline"
          variant="outlined"
        />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          //   type="password"
          id="password"
          autoComplete="current-password"
          color="outline"
          variant="outlined"
        />
        {isLoading && (
          <Box>
            <LoadingButton
              loading
              variant="outlined"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
              color="primary"
            >
              Sign Up
            </LoadingButton>
          </Box>
        )}
        {isError && (
          <Alert variant="standard" severity="error">
            Something went wrong, please try again later.
          </Alert>
        )}
        {!isLoading && (
          <Box>
            <Button
              onClick={registerHandler}
              //   type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              // onSubmit={registerHandler}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </FormControl>
    </Container>
  );
}
