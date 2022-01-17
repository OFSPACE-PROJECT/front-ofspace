import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Chat(data) {
  const user = useSelector((state) => state.persistedReducer.user);
  console.log(user);

  return (
    <>
      {data.type === user.role && (
        <Box sx={{display: "flex", flexDirection:"column", alignItems:"flex-end"}}>
          <Typography gutterBottom variant="body1" component="div">
            {data.message}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {data.updated_at}
          </Typography>
        </Box>
      )}
      {data.type !== user.role && 
        <Box sx={{display: "flex", flexDirection:"column", alignItems:"flex-start"}}>
          <Typography gutterBottom variant="body1" component="div">
            {data.message}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {data.updated_at}
          </Typography>
        </Box>}
    </>
  );
}
