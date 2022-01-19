import React from "react";
import SideBar from "../../components/sidebar/customer";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <Container
        sx={{ display: "flex", justifyContent: "space-between", ml: 5, mr: 5 }}
      >
        <SideBar />
        <Outlet/>
      </Container>
    </>
  );
}
