import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";

export default function Nav() {
  const token = useSelector((state) => state.persistedReducer.user.token);

  return (
    <Box sx={{ borderBottom: 1, borderColor:"white" }}>
      <AppBar position="static" sx={{ backgroundColor: "#0D5C8C" }}>
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          <Box
            // spacing={1}
            // columns={12}
            sx={{ alignItems: "center", display: "flex", flexWrap: "nowarp" }}
          >
            <nav>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "nowarp",
                  columnGap: 2,
                  width: "fit-content",
                }}
              >
                {/* <Grid item xs={2}> */}
                <Box noWrap sx={{ width: "fit-content", padding: "10px" }}>
                  <Link
                    href="/"
                    sx={{ color: "#ffff", textDecoration: "none" }}
                  >
                    <Typography
                      variant="h4"
                      // noWrap
                      component="div"
                    >
                      Ofspace
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ width: "fit-content%", padding: "10px" }}>
                  <Link
                    href="/become-supervisor"
                    sx={{ color: "#ffff", textDecoration: "none" }}
                  >
                    <Typography variant="h6" component="div">
                      Lease Your Place
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </nav>
          </Box>
          <Box sx={{ display: "flex", padding: "10px" }}>
            {token && (
              <Link
                href="/user"
                sx={{ color: "#ffff", textDecoration: "none", padding: "10px" }}
              >
                <AccountCircle />
              </Link>
            )}
            {!token && (
              <Link
                variant="h6"
                // noWrap
                component="a"
                // color="primary.typography"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    color: "#ffff",
                    textDecoration: "none",
                    padding: "10px",
                  },
                }}
                href="/login"
              >
                Login
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
