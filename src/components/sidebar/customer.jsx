import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Container, Link } from "@mui/material";

export default function CustomerBar() {
  return (
    <Container
      sx={{
        width: "fit-content",
        padding: 2,
        bgcolor: "#212121",
        borderRadius: 5,
        height: "fit-content",
      }}
    >
      <Box sx={{ borderBottom: " 1px solid #ABABB1" }}>
        <Typography gutterBottom variant="h4" component="div" color="white">
          My Account
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", pt: 2 }}
      >
        <Link href="/user">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="white"
            //   sx={{ textAlign: "center" }}
          >
            Profil
          </Typography>
        </Link>
      <Link href="/user/booking">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color="white"
          //   sx={{ textAlign: "center" }}
        >
          Booking
        </Typography>
        </Link>
        <Link href="/user/setting">
        <Typography
          gutterBottom
          variant="h6"
          component="p"
          color="white"
          //   sx={{ textAlign: "center" }}
        >
          Setting
        </Typography>
        </Link>
      </Box>
    </Container>
  );
}
