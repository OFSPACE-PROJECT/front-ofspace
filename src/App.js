import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./components/chat/modal";
import User from "./pages/user/customer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./route/private";
import Profile from "./components/user/profil";

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
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="" element={<User />}>
                <Route index element={<Profile />} />
                <Route path="booking" element={<Profile />} />
                <Route path="setting" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
          <Chat />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
