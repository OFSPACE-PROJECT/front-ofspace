import React from "react";
import LoginContainer from "../../components/auth/login";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function Login() {
  return (
    <>
      <LoginContainer />
      <Box  sx={{display:'flex', justifyContent:'center', mt:2,}}>
      <Link href="/register" color="#ABABB1" sx={{ textDecoration: "none" }}>
        Or create an account
      </Link>
      </Box>
    </>
  );
}
