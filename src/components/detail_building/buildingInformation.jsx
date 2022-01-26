import Box from "@mui/material/Box";
import {Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex"
	},
	item: {
		borderRadius: "5px",
		padding: "5px",
		margin: "5px",
		maxWidth: 180,
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	color1: {
		backgroundColor: "red",
	}
}));

export default function BuildingInformation(props) {
	const classes = useStyles();

	return (
		// <Box className={classes.container}>
		<Box sx={{
			margin: "10px",
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gridTemplateRows: 'repeat(2)',
			maxWidth:900,
			textAlign: 'center',
		}} >
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Year Constucted
				</Typography>
				<Typography variant="subtitle1" fontWeight="bold">
					{/*1990*/}
					{props.buildingData.year_constucted}
				</Typography>
			</Card>

			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Floor Count
				</Typography>
				<Typography variant="subtitle2">
					{/*12*/}
					{props.buildingData.floor_count}
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Average Floor Plate

				</Typography>
				<Typography variant="subtitle2">
					{/*250 m{"\u00B2"}*/}
					{props.buildingData.average_floor_size} m{"\u00B2"}
				</Typography>
			</Card >
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Building Size
				</Typography>
				<Typography variant="subtitle2">
					{/*250 m{"\u00B2"}*/}
					{props.buildingData.building_size} m{"\u00B2"}
				</Typography>
			</Card>
			<Card className={classes.item}>

				<Typography variant="subtitle1" fontWeight="bold">
					Office Hours
				</Typography>
				<Typography variant="subtitle2">
					{/*Lorem ipsum dolor sit amet.*/}
					{props.buildingData.office_hours}
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Membership Parking
				</Typography>
				<Typography variant="subtitle2">
					{/*Lorem ipsum dolor sit amet.*/}
					{props.buildingData.parking}
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Toilets
				</Typography>
				<Typography variant="subtitle2" >
					{/*Lorem ipsum dolor sit amet.*/}
					{props.buildingData.toilets}
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Lifts
				</Typography>
				<Typography variant="subtitle2">
					{/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis earum eius eos hic velit voluptate.*/}
					{props.buildingData.lifts}
				</Typography>
			</Card>
		</Box>
	);
}