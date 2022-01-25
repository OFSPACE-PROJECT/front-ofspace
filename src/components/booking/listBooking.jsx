import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Booking from "./booking";
import ModalBox from "./modal";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "65%",
    backgroundColor: "#212121",
    borderRadius: 15,
    padding: (20, 20, 20, 20),
  },
});

export default function ListBooking(props) {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [booking, setBooking] = useState([]);
  const [id, setId] = useState(0);
  const handleOpen = (e, id) => {
    e.preventDefault();
    setId(id);
  };
  const handleClose = () => {
    setId(0);
    setOpen(false);
  };
  useEffect(() => {
    console.log(id);
    if (id !== 0) {
      setOpen(true);
    }
  }, [id]);
  useEffect(() => {
    // props.setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/booking/user?user_id=${props.user.id}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.user.token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        console.log(response.data.data);
        // const resp = response.data.data;
        if (response.data.data != null) {
          setBooking(response.data.data);
        } else {
          setMsg("You dont have booking yet");
          setError(true);
        }
        console.log(booking);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setMsg("Something Gone Wrong");
        setError(true);
        setLoading(false);
      });
  }, []);
  console.log(booking);
  return (
    <>
      {loading && (
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
      {!loading && (
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
                Booking
              </Typography>
            </Box>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Building Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Deal Date</TableCell>
                  <TableCell align="center">Step Process</TableCell>
                  <TableCell align="center">Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!error &&
                  booking.map((booking) => (
                    <Booking
                      key={booking.id}
                      booking={booking}
                      OpenModal={handleOpen}
                      SetId={setId}
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
            <ModalBox id={id} user={props.user} />
          </Modal>
        </>
      )}
    </>
  );
}
