import Box from "@mui/material/Box";
import {MenuItem, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex"
	},
	item: {
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	button: {
		backgroundColor: "red"
	}
}));


export default function BannerBuilding(props) {
	const classes = useStyles();

	return (
			<div className={classes.container}>
				<div><img src={props.image_url} alt="test" width="210px" height="250px" /></div>
				<Card className={classes.itemFlexGrow}>
					<CardContent>
						<Typography mt={3} align="center" gutterBottom variant="h3" >
							{props.name}
						</Typography>
						<Typography align="center" gutterBottom variant="h6" >
							Choose Type to Show Photos and Facilities:
						</Typography>
						{!props.isLoading &&
							props.buildingData.units.map((unit) => (
						<MenuItem onClick={(e)=>props.setUnitId(e.target.value)} key={unit.id} value={unit.id}>
							{unit.unit_type}
						</MenuItem>
						))}
					</CardContent>
				</Card>
				{/*<div> <img src="https://picsum.photos/id/237/200/300" alt="test" width="210px" height="250px" /> </div>*/}
				<div> <img src={props.image_url} alt="test" width="210px" height="250px" /> </div>
			</div>
	);
}