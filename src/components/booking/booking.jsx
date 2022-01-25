import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export default function BasicTable(props) {
  const booking = props.booking
  const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric', month: 'long', weekday: "long", year: "numeric" });
  let deal_date = new Date(booking.deal_date);
  return (
    <TableRow
      key={booking.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" align="center" scope="row">
        {booking.id}
      </TableCell>
      <TableCell align="center">{booking.building.name}</TableCell>
      <TableCell align="center">{booking.price}</TableCell>
      <TableCell align="center">{dateFormatter.format(deal_date)}</TableCell>
      <TableCell align="center">{booking.booking_status}</TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={(e) =>props.OpenModal(e, booking.id)}>Show</Button>
      </TableCell>
      <TableCell align="center">
      </TableCell>
    </TableRow>
  );
}
