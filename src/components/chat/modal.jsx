import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import { Typography, Modal, Button, Fab } from "@mui/material";
import { useSelector } from "react-redux";
import Chat from "./chat";
import { useSubscriptionChat } from "../../hooks/SubscriptionChat";
export default function ModalChat() {
  const user = useSelector((state) => state.persistedReducer.user);
  console.log(user);
  console.log(user.role);
  const { allChat, errorAllChat, loadingAllChat } = useSubscriptionChat(user);

  console.log(allChat);
  console.log(allChat?.ofspace_chat[0].id);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab
        variant="extended"
        size="medium"
        sx={{
          color: "white",
          bgcolor: "#508BAE",
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}>
        <ChatIcon />
        Live Chat
      </Fab>
      {/* <Button </Button> */}
      {loadingAllChat && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            // backgroundColor: "#ffff",
            // borderRadius: 10,
            // border: " 1px solid #ABABB1",
          }}
        >
        <Typography gutterBottom variant="h4" color="white" component="div">
          Loading...
        </Typography>
        </Box>
      )}
      {errorAllChat && (
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
            Something Gone Wrong
          </Typography>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {allChat?.ofspace_chat && <Chat chat={allChat?.ofspace_chat[0]} />}
      </Modal>
    </>
  );
}
