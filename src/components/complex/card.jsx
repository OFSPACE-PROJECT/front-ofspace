import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ComplexCard(props) {
  const data = props.complex;
  let image = ""
  if (data.buildings !== null){
    image = data.buildings[0].image_url
    console.log(image)
  }else{
    image = null
    console.log(image)
  };
  console.log(data)
  const navigate = useNavigate();
  const OnClick = () => {
    navigate(`/building/${props.complex.id}`);
  };
  return (
    <Card sx={{ maxWidth: "500px"}}>
      <CardActionArea onClick={OnClick} >
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            height="200"
            sx={{width: "250px"}}
            src={image}
            alt="Building Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.address}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
