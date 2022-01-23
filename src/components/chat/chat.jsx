import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Container,
  InputBase,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./message";
import { useInsertMessage } from "../../hooks/InsertMessage";
import { useSubscriptionMessage } from "../../hooks/SubscriptionMessage";

export default function Chat(data) {
  const user = data.user;
  const chat = data.chat[0];
  const [value, setValue] = useState("");
  const { InsertMessage } = useInsertMessage();
  const { allMessage, errorAllMessage, loadingAllMessage } =
    useSubscriptionMessage(chat?.id);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onClick = () => {
    console.log(value, user.role, chat.id);

    InsertMessage({
      variables: {
        chat_id: chat?.id,
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
      {loadingAllMessage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            style={{ width: "200px", height: "200px", color: "#white" }}
          />
        </Box>
      )}

      {errorAllMessage && (
        <>
          {data?.chat?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                // width: "25%",
                // height: "25%",
                backgroundColor: "#ffff",
                // borderRadius: 10,
                // border: " 1px solid #ABABB1",
              }}
            >
              <Typography
                gutterBottom
                variant="h4"
                color="black"
                component="div"
              >
                You have not started a chat, Please click booking on building
                page
              </Typography>
            </Box>
          ):(
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffff",
            }}
          >
            <Typography gutterBottom variant="h4" color="black" component="div">
              Something Gone Wrong
            </Typography>
          </Box>
          )}
        </>
      )}
      {data?.chat?.length !== 0 && (
        <>
          <Box sx={{ overflow: "auto", height: "80vh" }}>
            {allMessage?.ofspace_message.map((message) => (
              <Message data={message} key={message.id} user={user} />
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
        </>
      )}
    </Container>
  );
}
