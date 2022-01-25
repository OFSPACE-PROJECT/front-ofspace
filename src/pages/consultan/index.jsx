import { Box } from "@mui/material";
import React from "react";
import ListChat from "../../components/consultan/listChat.jsx";
import NeedConsultan from "../../components/consultan/needConsultan.jsx";

export default function Home(props) {
    const user = props.user
  return (
    <Box sx={{width: "100%", heigth: "100%",display:"flex", flexDirection:"column", rowGap: "10%"}}>
      <NeedConsultan sx={{width:"100%", heigth: "100%"}} user={user}/>
      <ListChat sx={{width:"100%", heigth: "100%"}}  user={user} chat={props.chat} error={props.error} />
    </Box>
  );
}
