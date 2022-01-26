import Box from "@mui/material/Box";
import {List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex"
	},
	item: {
		borderRadius: "5px",
	},
	itemFlexGrow: {
		flexGrow: 1,
	},
	color1: {
		backgroundColor: "red",
	}
}));

export default function BuildingInformation() {
	const classes = useStyles();

	return (
		<Box className={classes.container} maxWidth="1000px" sx={{display: "flex", flexWrap:"Wrap"}}>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Office Hours:
				</Typography>
				<Typography variant="subtitle2">
					Lorem ipsum dolor sit amet.
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Membership Parking
				</Typography>
				<Typography variant="subtitle2">
					Lorem ipsum dolor sit amet.
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Toilets
				</Typography>
				<Typography variant="subtitle2" >
					Lorem ipsum dolor sit amet.
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Building Size
				</Typography>
				<Typography variant="subtitle2">
					250 m{"\u00B2"}
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Average Floor Plate
				</Typography>
				<Typography variant="subtitle2">
					250 m{"\u00B2"}
				</Typography>
			</Card >
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Floor Count
				</Typography>
				<Typography variant="subtitle2">
					12
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Year Constucted
				</Typography>
				<Typography variant="subtitle1" fontWeight="bold">
					1990
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Lifts
				</Typography>
				<Typography variant="subtitle2">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis earum eius eos hic velit voluptate.
				</Typography>
			</Card>
			<Card className={classes.item}>
				<Typography variant="subtitle1" fontWeight="bold">
					Facilities
				</Typography>
				<List>
					{['Inbox', 'Setting'].map((text, index) => (
						<ListItem key={text}>
							<ListItemText primary={text} sx={{fontSize:'11px'}}/>
						</ListItem>
					))}
				</List>
			</Card>
		</Box>
	);
}