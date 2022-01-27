import {makeStyles} from "@mui/styles";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import Card from "@mui/material/Card";


const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex"
	},
	item: {
		borderRadius: "5px",
		padding: "5px",
		margin: "5px",
		marginLeft: "15px",
		width:220,
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	color1: {
		backgroundColor: "red",
	},
	rating: {
		borderRadius: "5px",
		padding: "5px",
		margin: "5px",
		maxWidth: 300,

	}
}));

export default function ListReview(props) {

		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [listReview, setReview] = useState([])
		const classes = useStyles();

		useEffect( () => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}/review/all/${props.unit_id}`, {
					headers: {
						accept: "*/*",
						"Content-Type": "application/json",
						Authorization: "Bearer " + props.user.token,
					},
				})
				.then(function (response) {
					console.log(response);
					if (response.data.data != null) {
						setReview(response.data.data);
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

	const isLoading = loading

	return ( <>
			{!isLoading && <Box sx={{
				margin: "10px",
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				maxWidth:900,
				textAlign: 'center',
			}} >
				{ listReview && listReview.map((review) => (
					<Card className={classes.rating}>
						<Typography variant='subtitle2'>
							Overall Rating : {review.costumer_overall_rating}
						</Typography>
						<Typography variant='subtitle2'>
							Access : {review.rating_acces}
						</Typography>
						<Typography variant='subtitle2'>
							Facility : {review.rating_facility}
						</Typography>
						<Typography variant='subtitle2'>
							Management : {review.rating_management}
						</Typography>
						<Typography variant='subtitle2'>
							Quality : {review.rating_quality}
						</Typography>
						<Paper>
							Review : {review.comment}
						</Paper>
					</Card>
				))} </Box>}</>
	)
}