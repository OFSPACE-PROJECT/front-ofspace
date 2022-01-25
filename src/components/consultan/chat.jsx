import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link, Typography, IconButton, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ConsultanChat(props) {
  const chat = props.chat;
  console.log (props.index)
  const id = props.index;
  console.log (id)
  const dateFormatter = new Intl.DateTimeFormat("id", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  let updated_at = new Date(chat.updated_at);
  let created_at = new Date(chat.created_at);

  return (
    <>
      <TableRow
        key={chat.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {chat.id}
        </TableCell>
        <TableCell align="center">{chat.customer_id}</TableCell>
        <TableCell align="center">{dateFormatter.format(updated_at)}</TableCell>
        <TableCell align="center">{dateFormatter.format(created_at)}</TableCell>
        <TableCell align="center">
          <Link href={`/consultan/booking/${chat.customer_id}`}>
            <Typography
              gutterBottom
              noWrap
              variant="h6"
              component="div"
              color="white"
            >
              Book here
            </Typography>
          </Link>
        </TableCell>
        {!props.user && (
          <>
            <TableCell align="center">
              <IconButton variant="contained" onClick={(e) =>props.ChatModal(e, id)}>
                <ChatIcon />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <Button variant="contained" onClick={(e) =>props.Finish(e, chat.id)}>
                Finish
              </Button>
            </TableCell>
          </>
        )}
        {props.user && (
          <TableCell align="center">
            <Button
              variant="contained"
              onClick={(e) => props.onClick(e, chat.id)}
            >
              Accept
            </Button>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}
