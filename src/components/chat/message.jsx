import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Chat(data) {
  const user = data.user;

  return (
    <>
      {data.data.type !== user.role && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            color: "black",
            padding: 1
          }}
        >
          <Box sx={{ borderRadius: "5px", bgcolor: "#4A598E", padding: 2 }}>
            <Typography gutterBottom variant="body1" component="div">
              {data.data.message}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {data.data.updated_at}
            </Typography>
          </Box>
        </Box>
      )}
      {data.data.type === user.role && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            color: "black",
            padding: 1
          }}
        >
          <Box sx={{ borderRadius: "5px", bgcolor: "#508BAE", padding: 2 }}>
            <Typography gutterBottom variant="body1" component="div">
              {data.data.message}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {data.data.updated_at}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
