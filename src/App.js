import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Complex from "./pages/complex";
import Chat from "./components/chat/modal";
import User from "./pages/user/customer";
import Consultan from "./pages/user/consultan";
import MainConsultan from "./pages/consultan";
import Home from "./pages/home";
import Search from "./pages/search";
import Review from "./pages/review";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./route/private";
import Profile from "./components/user/profil";
import Booking from "./components/booking/listBooking";
import FormBooking from "./components/booking/form";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSubscriptionChat } from "./hooks/SubscriptionChat";
import Nav from "./components/navbar/navbar";
import AxiosConfig from "./config/axiosInterceptor";

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
      console.log(loading + user);
      setLog(true);
      // setLoading(false)
    } else {
      setLog(false);
      console.log(loading + user);
      setLoading(false);
    }
  }, [user.token]);
  const { allChat, errorAllChat, loadingAllChat } = useSubscriptionChat(user);
  useEffect(() => {
    if (allChat?.ofspace_chat && !loadingAllChat) {
      setLoading(false);
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
        <AxiosConfig/>
        <div className="App">
          <Nav />
          {(loading || loadingAllChat) ? (
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
          ): (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/complex/:id" element={<Complex />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<PrivateRoute />}>
                  <Route path="" element={<User />}>
                    <Route
                      index
                      element={<Profile user={user} setLoading={setLoading} />}
                    />
                    <Route
                      path="booking"
                      element={<Booking user={user} setLoading={setLoading} />}
                    />
                    <Route path="setting" element={<Profile />} />
                  </Route>
                </Route>
                <Route path="review" element={<Review user={user} />} />
                <Route path="/consultan" element={<PrivateRoute />}>
                  <Route path="" element={<Consultan />}>
                    <Route
                      index
                      element={
                        <MainConsultan
                          user={user}
                          chat={allChat}
                          error={errorAllChat}
                        />
                      }
                    />
                    <Route
                      path="booking/:id"
                      element={<FormBooking user={user} />}
                    />
                    <Route
                      path="profil"
                      element={<Profile user={user} setLoading={setLoading} />}
                    />
                  </Route>
                </Route>
              </Routes>
              {log && (
                <Chat
                  user={user}
                  handleOpen={handleOpen}
                  open={open}
                  handleClose={handleClose}
                  errorAllChat={errorAllChat}
                  allChat={allChat}
                />
              )}
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
