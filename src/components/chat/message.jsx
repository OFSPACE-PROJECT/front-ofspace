import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Chat(data) {
  console.log(data);
  const user = useSelector((state) => state.persistedReducer.user);
  console.log(user);

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
