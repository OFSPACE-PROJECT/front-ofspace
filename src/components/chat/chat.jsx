import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Container, InputBase, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import Message from "./message";
import { useInsertMessage } from "../../hooks/InsertMessage";
import { useSubscriptionMessage } from "../../hooks/SubscriptionMessage";
import { useSubscriptionChat } from "../../hooks/SubscriptionChat";

export default function Chat(data) {
  const user = useSelector((state) => state.persistedReducer.user);
  console.log(user);
  console.log(user.role);
  const [value, setValue] = useState("");
  const { InsertMessage } = useInsertMessage();
  const { allMessage, errorAllMessage, loadingAllMessage } =
    useSubscriptionMessage(data?.chat?.id);
  console.log(allMessage);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onClick = () => {
    console.log(value, user.role, data.chat.id);

    InsertMessage({
      variables: {
        chat_id: data?.chat?.id,
        message: value,
        type: user.role,
      },
    });
    setValue("");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "flex-end",
        // color: "#0000",
        width: "50%",
        backgroundColor: "#ffff",
        borderRadius: 10,
        padding: (5, 5, 5, 5),
      }}
    >
      
      {data?.chat?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "25%",
            height: "25%",
            backgroundColor: "#ffff",
            borderRadius: 10,
            border: " 1px solid #ABABB1",
          }}
        >
          <Typography gutterBottom variant="h4" color="black" component="div">
            You have not started a chat, Please click booking on building page
          </Typography>
        </Box>
      )}
      <Box sx={{ overflow: 'auto', height: "80vh" }}>
        {allMessage?.ofspace_message.map((message) => (
          <Message data={message} key={message.id} />
        ))}
      </Box>
      <Box
        sx={{
          borderRadius: "25px",
          display: "flex",
          color: "black",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <InputBase
          // sx={{ ml: 1, flex: 1 }}
          value={value}
          onChange={onChange}
          placeholder="Enter a message"
          sx={{ color: "black" }}
        />
        <IconButton
          onClick={onClick}
          type="button"
          sx={{ p: "10px", color: "black" }}
          aria-label="search"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
