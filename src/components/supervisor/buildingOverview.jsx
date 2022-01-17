
import React, {Fragment} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import rows from "./buildingData";
import Button from "@mui/material/Button";

// const useStyles = makeStyles({
// 	table: {
// 		minWidth: 650,
// 	},
// });

export default function BuildingOverview() {
// const classes = useStyles();
return (
	<Fragment>
		<div className="container" style={{marginTop:"2%", width: "90%", marginRight:"4%"}}>
		<h1 className="title">Building Overview</h1>
		<Paper className="container" >
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>No</TableCell>
						<TableCell >Building Name</TableCell>
						<TableCell >Unit Type</TableCell>
						<TableCell >Unit Capacity</TableCell>
						<TableCell >Unit Filled</TableCell>
						<TableCell >Keterangan</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(({ id, building_id, building_name, unit_type, unit_capacity, unit_filled }) => (
						<TableRow key={id}>
							<TableCell component="th" scope="row">
								{building_id}
							</TableCell>
							<TableCell >{building_name}</TableCell>
							<TableCell >{unit_type}</TableCell>
							<TableCell >{unit_capacity}</TableCell>
							<TableCell >{unit_filled}</TableCell>
							<TableCell ><Button variant="outlined"	>Edit Building</Button></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
		</div>
	</Fragment>
)}
