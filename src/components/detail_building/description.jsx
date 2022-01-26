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

export default function DescriptionBuilding() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Card>
				<Typography variant="h6">
					Building Description :
				</Typography>
				<Typography variant="subtitle1">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cumque ea eaque excepturi exercitationem hic illum, labore laboriosam perferendis repellat sint tempora velit.
				</Typography>
			</Card>
		</div>
	);
}