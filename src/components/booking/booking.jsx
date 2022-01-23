import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export default function BasicTable(props) {
  const booking = props.booking

  return (
    <TableRow
      key={booking.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {booking.Id}
      </TableCell>
      <TableCell align="center">{booking.Building.Name}</TableCell>
      <TableCell align="center">{booking.Price}</TableCell>
      <TableCell align="center">{booking.Price}</TableCell>
      <TableCell align="center">{booking.Deal_date}</TableCell>
      <TableCell align="center">{booking.Step_Process}</TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={props.OpenModal}>Show</Button>
      </TableCell>
      <TableCell align="center">
      </TableCell>
    </TableRow>
  );
}
