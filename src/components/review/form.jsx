import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function ReviewForm(props) {
  const [Comment, setComment] = useState("");
  const [RatingAccess, setRatingAccess] = useState(0);
  const [RatingFacility, setRatingFacility] = useState(0);
  const [RatingManagement, setRatingManagement] = useState(0);
  const [RatingQuality, setRatingQuality] = useState(0);
  const SubmitHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/review`,
        {
          customer_id: props.user.id,
          unit_id: parseInt(props.unit),
          building_id: parseInt(props.building),
          booking_id: parseInt(props.booking),
          rating_acces: parseInt(RatingAccess),
          rating_facility: parseInt(RatingFacility),
          rating_management: parseInt(RatingManagement),
          rating_quality: parseInt(RatingQuality),
          comment: Comment,
        },
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
        setComment("");
        setRatingAccess(0);
        setRatingFacility(0);
        setRatingManagement(0);
        setRatingQuality(0);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <Stack
      spacing={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#212121",
        borderRadius: "15px",
        width: "70%",
        padding: "25px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: "20px",
          padding: "10px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" color="white">
          RatingAccess
        </Typography>
        <Rating
          name="RatingAccess"
          value={RatingAccess}
          onChange={(e) => setRatingAccess(e.target.value)}
          size="large"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: "20px",
          padding: "10px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" color="white">
          RatingFacility
        </Typography>
        <Rating
          name="RatingFacility"
          value={RatingFacility}
          onChange={(e) => setRatingFacility(e.target.value)}
          size="large"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: "20px",
          padding: "10px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" color="white">
          RatingManagement
        </Typography>
        <Rating
          name="RatingManagement"
          value={RatingManagement}
          onChange={(e) => setRatingManagement(e.target.value)}
          size="large"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          columnGap: "20px",
          padding: "10px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" color="white">
          RatingQuality
        </Typography>
        <Rating
          name="RatingQuality"
          value={RatingQuality}
          onChange={(e) => setRatingQuality(e.target.value)}
          size="large"
        />
      </Box>
      <TextField
        id="comment"
        label="Comment"
        multiline
        rows={4}
        value={Comment}
        onChange={(e) => setComment(e.target.value)}
        color="secondary"
      />
      <Button
        onClick={SubmitHandler}
        // type="submit"
        variant="contained"
        color="secondary"
        sx={{ mt: 3, mb: 2 }}
        // onSubmit={BookingHandler}
      >
        Booking
      </Button>
    </Stack>
  );
}
