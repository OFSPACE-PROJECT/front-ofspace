import Box from "@mui/material/Box";
import {Paper, Typography} from "@mui/material";
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
	}
}));

export default function BannerBuilding() {
	const classes = useStyles();

	return (
			<div className={classes.container}>
				<div><img src="https://picsum.photos/id/237/200/300" alt="test" width="180px" height="270px" /></div>
				<Card className={classes.itemFlexGrow}>
					<CardContent>
						<Typography mt={5} align="center" gutterBottom variant="h2" >
							Name of Building
						</Typography>
						<Typography align="center" gutterBottom variant="h5" >
							Type : Unit Type
						</Typography>
					</CardContent>
				</Card>
				<div> <img src="https://picsum.photos/id/237/200/300" alt="test" width="180px" height="270px" /> </div>
			</div>
	);
}