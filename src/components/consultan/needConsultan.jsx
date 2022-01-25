import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Chat from "./chat";
import { useSubscriptionChatNull } from "../../hooks/SubscriptionChatNull";
import { useUpdateChat } from "../../hooks/UpdateChat";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // width: "65%",
    backgroundColor: "#212121",
    borderRadius: 15,
    padding: (20, 20, 20, 20),
  },
});

export default function NeedConsultan(props) {
  const styles = useStyles();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  // const [id, setId] = useState();
  const { allChat, errorAllChat, loadingAllChat } =
    useSubscriptionChatNull();
    useEffect(() => {
    if (allChat?.ofspace_chat.length === 0){
        setMsg("There is no customer that need consultan")
        setError(true)
    } else if (errorAllChat){
        console.log(errorAllChat)
        setMsg("Something gone wrong!!")
        setError(true)
    }
  }, [allChat?.ofspace_chat]);
  const { UpdateChat } = useUpdateChat();
  const onClick = (e, id) => {
    e.preventDefault();
    console.log(id)
    // setId(e.value)
    UpdateChat({
      variables: {
        pk_columns: {id: id},
        consultan_id: props.user.id,
      },
    });
  };
  return (
    <>
      {loadingAllChat && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
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
      {!loadingAllChat && (
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
                Need Consultan
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
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!error &&
                    allChat?.ofspace_chat.map((chat) => (
                    <Chat
                      key={chat.id}
                      chat={chat}
                      user={props.user}
                      onClick={onClick}
                    />
                  ))}
                {error && (
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
                )}
              </TableBody>
            </Table>
          </Container>
        </>
      )}
    </>
  );
}
