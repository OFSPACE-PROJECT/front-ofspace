import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Container, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Chat from "./chat";
import ChatModal from "../chat/chat.jsx";
import { useDeleteChat } from "../../hooks/DeleteChat";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // width: "fit-content",
    backgroundColor: "#212121",
    borderRadius: 15,
    padding: (20, 20, 20, 20),
  },
});

export default function ListChat(props) {
  const user = props.user;
  const styles = useStyles();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState(0);
  console.log(id)
  if (props.chat?.length === 0) {
    setMsg("You dont have Chat yet");
    setError(true);
  } else if (props.error) {
    setMsg("Something gone wrong!!");
    setError(true);
  }
  const { DeleteChat } = useDeleteChat();
  const onClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    DeleteChat({
      variables: {
        id: id,
      },
    });
  };
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setId(null);
    setOpen(false);
    setModal(false);
  };
  const ChatHandler = (e, id) => {
    e.preventDefault();
    setId(id);
    setModal(true)
  };
  useEffect(() => {
    console.log(id);
    if (id !== undefined && modal) {
      handleOpen();
    }
  }, [id]);
  return (
    <>
      <Container className={styles.container}>
        <Box sx={{ borderBottom: " 1px solid #ABABB1" }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            color="white"
            textAlign="left"
          >
            Chat
          </Typography>
        </Box>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Chat Id</TableCell>
              <TableCell align="center">Customer Id</TableCell>
              <TableCell align="center">Last Update</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Booking Form</TableCell>
              <TableCell align="center">Chat</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error ? (
              <TableCell component="th" scope="row" colSpan={6}>
                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="white"
                    component="div"
                  >
                    {msg}
                  </Typography>
                </Box>
              </TableCell>
            ) : (
              props.chat?.ofspace_chat.map((chat, index) => (
                <Chat
                  index ={index}
                  key={chat.id}
                  chat={chat}
                  ChatModal={ChatHandler}
                  Finish={onClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Container>
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
          {props.chat?.ofspace_chat && (
            <ChatModal setLoading={props.setLoading} chat={props.chat?.ofspace_chat[id]} user={user} />
          )}
        </Container>
      </Modal>
    </>
  );
}
