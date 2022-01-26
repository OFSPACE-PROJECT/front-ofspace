import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {Button, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {makeStyles} from "@mui/styles";
import ModalPhotoExterior from "./modalPhotoExterior";
import ModalPhotoFloor from "./modalPhotoFloor";
import ModalPhotoInterior from "./modalPhotoInterior";
import {useEffect, useState} from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex"
	},
	item: {
		borderRadius: "5px",
		padding: "5px",
		margin: "5px",
		width: 260,
		height: 235,
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	color1: {
		backgroundColor: "red",
	}
}));

export default function DetailPhoto(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [exteriorPhoto, setExteriorPhoto] = useState([])
	const [interiorPhoto, setInteriorPhoto] = useState([])
	const [floorPhoto, setFloorPhoto] = useState([])
	const [openInterior, setOpenInterior] = useState(false);
	const handleOpenInterior = () => setOpenInterior(true);
	const handleCloseInterior = () => setOpenInterior(false);
	const [openExterior, setOpenExterior] = useState(false);
	const handleOpenExterior = () => setOpenExterior(true);
	const handleCloseExterior = () => setOpenExterior(false);
	const [openFloor, setOpenFloor] = useState(false);
	const handleOpenFloor = () => setOpenFloor(true);
	const handleCloseFloor = () => setOpenFloor(false);

	useEffect( () => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/building/${props.id}/exterior`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data?.data != null) {
					setExteriorPhoto(response.data.data);
				} else {
					setError(true);
				}
				setLoading(false);
			})
			.catch(function () {
				setError(true);
				setLoading(false);
			});
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/unit/${props.unit_id}/interior`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data?.data != null) {
					setInteriorPhoto(response.data.data);
				} else {
					setError(true);
				}
				setLoading(false);
			})
			.catch(function () {
				setError(true);
				setLoading(false);
			});
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/building/${props.id}/floor`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data?.data != null) {
					setFloorPhoto(response.data.data);
				} else {
					setError(true);
				}
				setLoading(false);
			})
			.catch(function () {
				setError(true);
				setLoading(false);
			});
	}, [])
	const isLoading = loading;
	const isError = error;
	// console.log("thisext", exteriorPhoto[0].photo_url)
	let addExterior
	if (isLoading || exteriorPhoto[0] === undefined) {
		addExterior = "https://picsum.photos/200/300"
	} else {
		addExterior= exteriorPhoto[0]?.photo_url
	}
	let addInterior
	if (isLoading || interiorPhoto[0] === undefined) {
		addInterior = "https://picsum.photos/200/300"
	} else {
		addInterior= interiorPhoto[0]?.photo_url
	}
	let addFloor
	if (isLoading || floorPhoto[0] === undefined) {
		addFloor = "https://picsum.photos/200/300"
	} else {
		addFloor= floorPhoto[0]?.photo_url
	}

	// console.log(typeof floorPhoto[0])
	return (<>
		<Box sx={{
			display: 'flex',
			flexGrow:1,
			flexDirection: 'row',
			textAlign: 'center',
		}} >
			<Card className={classes.item}>
				<CardMedia
					component="img"
					height="200"
					width="300"
					// image={add}
					// image="https://picsum.photos/200/300"
					image={addInterior}
					alt="Interior Photo"
				/>
				<Button onClick={handleOpenInterior} variant="subtitle1" fontWeight="bold">
					Interior Photo
				</Button>
			</Card>
			<Card className={classes.item}>
				{!isLoading && <CardMedia
					component="img"
					height="200"
					width="300"
					image="https://picsum.photos/id/237/200/300"
					image={addExterior}
					alt="Exterior Photo"
				/>}
				<Button onClick={handleOpenExterior} variant="subtitle1" fontWeight="bold">
					Exterior Photo
				</Button>
			</Card>
			<Card className={classes.item}>
				<CardMedia
					component="img"
					height="200"
					width="300"
					// image="https://picsum.photos/id/237/200/300"
					image={addFloor}
					alt="Floor Photo"
				/>
				<Button onClick={handleOpenFloor} variant="subtitle1" fontWeight="bold">
					Floor Photo
				</Button>
			</Card>
		</Box>
			<ModalPhotoExterior handleOpen={handleOpenExterior} handleClose={handleCloseExterior} exterior={exteriorPhoto} open={openExterior}/>
			<ModalPhotoInterior handleOpen={handleOpenInterior} handleClose={handleCloseInterior} interior={interiorPhoto} open={openInterior}/>
			<ModalPhotoFloor handleOpen={handleOpenFloor} handleClose={handleCloseFloor} floor={floorPhoto} open={openFloor}/>
		</>
	);
}