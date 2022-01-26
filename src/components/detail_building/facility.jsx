import {List, ListItem, ListItemText, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {makeStyles} from "@mui/styles";
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
		width:220,
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	color1: {
		backgroundColor: "red",
	}
}));

export default function DetailFacility(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [unitFacility, setUnitFacility] = useState([])
	const [buildingFacility, setBuildingFacility] = useState([])
	const classes = useStyles();

	useEffect( () => {
		axios
			.get(`${process.env.REACT_APP_BASE_URL}/building/${props.id}/facility`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data.data != null) {
					setBuildingFacility(response.data.data);
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
			.get(`${process.env.REACT_APP_BASE_URL}/unit/${props.unit_id}/facility`, {
				headers: {
					accept: "*/*",
					"Content-Type": "application/json",
					Authorization: "Bearer " + props.user.token,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.data.data != null) {
					setUnitFacility(response.data.data);
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
	return (
		<Card className={classes.item}>
			<Typography padding="10px" variant="subtitle1" fontWeight="bold">
				Facilities
			</Typography>
			{/*<List>*/}
			{/*	{['Inbox', 'Setting', 'a', 'b', 'c'].map((text, index) => (*/}
			{/*		<ListItem key={text}>*/}
			{/*			<ListItemText primary={text} sx={{fontSize:'11px'}}/>*/}
			{/*		</ListItem>*/}
			{/*	))}*/}
			{/*</List>*/}
			<List>
				{buildingFacility.map((nama, index) => (
					<ListItem key={nama}>
						<ListItemText primary={nama} sx={{fontSize:'11px'}}/>
					</ListItem>
				))}
				{unitFacility.map((nama, index) => (
					<ListItem key={nama}>
						<ListItemText primary={nama} sx={{fontSize:'11px'}}/>
					</ListItem>
				))}
			</List>
		</Card>
	)
}