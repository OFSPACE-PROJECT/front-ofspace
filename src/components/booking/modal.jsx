import React, { useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ModalChat(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState({});
  const [review, setReview] = useState(false);
  const navigate = useNavigate();
  const navigateReview = () => {
    navigate(`/review/${booking?.id}`);
  };

  axios
    .get(`${process.env.REACT_APP_BASE_URL}/booking/${props.id}`, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI5MzE0NTMsIm5hbWUiOiJoYWxvIiwicm9sZSI6ImN1c3RvbWVyIiwidXNlcklkIjozfQ.QtwzCnoJf2yzUJPSxWWbXCxRoYenNMD1WcsuCwLTalI",
      },
    })
    .then(function (response) {
      console.log(response);
      if (response.data.data != null) {
        setBooking(response.data);
        if (response.data.data.booking_status === "rented") {
          setReview(true);
        }
      } else {
        setError(true);
      }
      setLoading(false);
    })
    .catch(function () {
      setError(true);
      setLoading(false);
    });

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
            justifyContent: "center",
          // color: "#0000",
          width: "50%",
          backgroundColor: "#ffff",
          borderRadius: 10,
          padding: ("15px", "15px", "15px", "15px"),
        }}
      >
        {!loading && (
          <>
            {error && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // width: "25%",
                  height: "100%",
                  // backgroundColor: "#ffff",
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
                  Something Gone Wrong
                </Typography>
              </Box>
            )}
            {!error && (
              <>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Booking Id
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.Id}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.confirmed_name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Building Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.building.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Total Bought
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.TotalBought}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Price
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.price}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Deal Date
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.deal_date}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", padding: "5px" }}
                >
                  <Box sx={{ width: "20%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ textAlign: "left" }}
                    >
                      Status
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="p"
                      color="black"
                      sx={{ width: "50%", textAlign: "left" }}
                    >
                      : {booking?.booking_status}
                    </Typography>
                  </Box>
                </Box>
                {review && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <Button
                      onClick={navigateReview}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Yes
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
