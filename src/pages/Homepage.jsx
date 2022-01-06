import React from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { Container, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/system";
import Navbar from "../components/user/Navbar";
import Hero from "../components/user/home/Hero";

const home = createTheme({
  components: {
    Container: {
      variants: [
        {
          props: { variant: "home" },
          style: { backgroundColor: "#212121" },
        },
        {
          props: { variant: "navbar" },
          style: {},
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

export default function Homepage() {
  return (
    <>
      {/* <ThemeProvider theme={darkTheme}> */}
      <Navbar />
      <div style={{ backgroundColor: "#0D5C8C" }}>
        <Container variant='home'>
          <Hero />
        </Container>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
}
