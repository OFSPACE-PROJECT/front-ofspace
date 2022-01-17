import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Container,
  InputBase,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import Message from "./message";
import { useInsertMessage } from "../../hooks/InsertMessage";
import { useSubscriptionMessage } from "../../hooks/SubscriptionMessage";
import { useSubscriptionChat } from "../../hooks/SubscriptionChat";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "white",
    width: 800,
    backgroundColor: "#212121",
    borderRadius: 15,
    padding: (20, 20, 20, 20),
  },
});
export default function Chat() {
  const user = useSelector((state) => state.persistedReducer.user);
  console.log(user);
  // console.log(user.id);
  console.log(user.role);
  const styles = useStyles();
  const [value, setValue] = useState("");
  const [param, setParam] = useState({});
  const { InsertMessage  } = useInsertMessage();
  const { allChat, errorAllChat, loadingAllChat } = useSubscriptionChat(param);
  // useEffect(() => {
    // if (user) {
      if (user.role === "customer") {
        setParam({ "customer_id": { "_eq": user.id } });
      } else {
        setParam({ "consultan_id": { "_eq": user.id } });
      }
      console.log(param);
    // }
  // }, [user]);
  console.log(param);

  console.log(allChat)
  const { allMessage, errorAllMessage, loadingAllMessage } = useSubscriptionMessage(allChat[0]?.chat_id);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = () => {
    InsertMessage({
      variables: {
        // chat_id: allChat[0]?.chat_id,
        message: value,
        type: user.role,
      },
    });
  };

  return (
    <>
      <Typography gutterBottom variant="h4" component="div">
      You have not started a chat, Please click booking on building page
      </Typography>
      <Container className={styles.container}>
        <Box> {allMessage.map((message) => (
          <Message data={message}/> 
          ))}
        </Box>
        <Box sx={{ borderRadius: "25px", display: "flex" }}>
          <form onSubmit={onSubmit}>
            <InputBase
              // sx={{ ml: 1, flex: 1 }}
              value={value}
              onChange={onChange}
              placeholder="..."
              onSubmit={onSubmit}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SendIcon />
            </IconButton>
          </form>
        </Box>
      </Container>
    </>
  );
}
