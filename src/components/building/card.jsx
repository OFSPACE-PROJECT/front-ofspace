import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {makeStyles} from "@mui/styles";

const LINES_TO_SHOW = 3;

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical"
  }
});
export default function BuildingCard(props) {
//   const data = props.building;
//   console.log(data)
const classes = useStyles();
  const navigate = useNavigate();
  const OnClick = () => {
    navigate(`/building/${props.building.id}`);
  };
  return (
    <Card sx={{ maxWidth: "250px", marginBottom: 2, maxHeight: "270px" }}>
      <CardActionArea onClick={OnClick} >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            height="150"
            src={props.building.image_url}
            alt="Building Picture"
            loading="lazy"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.building.name}
            </Typography>
            <Typography component="div" variant="body2" color="text.secondary" className={classes.multiLineEllipsis}>
            {props.building.description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
