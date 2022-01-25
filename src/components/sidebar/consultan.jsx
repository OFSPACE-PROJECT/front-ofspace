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
        <Typography gutterBottom variant="h5" component="div" color="white">
          Consultan Page
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", pt: 2 }}
      >
        <Link href="/consultan">
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            color="white"
            //   sx={{ textAlign: "center" }}
          >
            Chat
          </Typography>
        </Link>
      <Link href="/consultan/profil">
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
        <Link href="/consultan/setting">
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
