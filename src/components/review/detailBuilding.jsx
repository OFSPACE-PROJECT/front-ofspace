import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BuildingReview(props) {
  const data = props.building;
  console.log(data);
  const navigate = useNavigate();
  const OnClick = () => {
    navigate(`/building/:${props.id}`);
  };
  return (
    <Card sx={{ width: "75%", display: "flex", borderRadius: "15px" }}>
      <CardActionArea onClick={OnClick}>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="200"
            src={data.image_url}
            alt="Building Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
