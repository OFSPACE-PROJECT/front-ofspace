import React from "react";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import { Typography, Modal, Fab, Container } from "@mui/material";
import Chat from "./chat";
export default function ModalChat(props) {
  const user = props.user;

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
        onClick={props.handleOpen}
      >
        <ChatIcon />
        Live Chat
      </Fab>
      {/* <Button </Button> */}
      {props.errorAllChat && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
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
          {props.allChat?.ofspace_chat.length === 0 && (
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
          )}
          {props.allChat?.ofspace_chat.length !== 0 && (
            <Chat
              chat={props.allChat?.ofspace_chat[0]}
              user={user}
              setLoading={props.setLoading}
            />
          )}
        </Container>
      </Modal>
    </>
  );
}
