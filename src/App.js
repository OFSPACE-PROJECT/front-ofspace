import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./components/chat/modal";
import User from "./pages/user/customer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./route/private";
import Profile from "./components/user/profil";
import Booking from "./components/booking/listBooking";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSubscriptionChat } from "./hooks/SubscriptionChat";

const darkTheme = createTheme({
  components: {
    Container: {
      variants: [
        {
          props: { variant: "login" },
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            maxWidth: "fit-content",
            backgroundColor: "#212121",
            borderRadius: 15,
            padding: (20, 20, 20, 20),
            mt: 2,
          },
        },
      ],
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#25274D",
      typography: "#fffff",
      button: "#4A598E",
    },
    secondary: {
      main: "#0D5C8C",
      button: "#2C272E",
      typography: "#fffff",
    },
    typography: {
      main: "#fffff",
    },
    bg: {
      main: "#272727",
    },
    outline: {
      main: "#ABABB1",
    },
    danger: {
      main: "#95150c",
      dark: "#f44336",
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState(false);
  const user = useSelector((state) => state.persistedReducer.user);
  useEffect(() => {
    if (user.token) {
      console.log(loading + user)
      setLog(true)
      setLoading(false)
    } else{
      console.log(loading + user)
      setLoading(false)
    }
  }, [user]);
  const { allChat, errorAllChat, loadingAllChat } = useSubscriptionChat(user);
  useEffect(() => {
    if (!loadingAllChat) {
      setLoading(false)
    }
  }, [loadingAllChat]);

  console.log(allChat);
  console.log(allChat?.ofspace_chat);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
        {loading && (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                style={{ width: "200px", height: "200px", color: "#white" }}
              />
            </Box>
          )}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="" element={<User />}>
                <Route index element={<Profile />} />
                <Route path="booking" element={<Booking />} />
                <Route path="setting" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
          { log && (
            <Chat user={user} handleOpen={handleOpen} open={open} handleClose={handleClose} errorAllChat={errorAllChat} allChat={allChat}/>
          )
          }
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
