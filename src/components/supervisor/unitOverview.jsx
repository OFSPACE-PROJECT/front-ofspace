import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";

export default function UnitOverview() {
	return (
		<Table>
			<TableRow>
				<TableCell variant="head">Header 1</TableCell>
				<TableCell>Cell 1</TableCell>
			</TableRow>
			<TableRow>
				<TableCell variant="head">Header 1</TableCell>
				<TableCell>Cell 2</TableCell>
			</TableRow>
		</Table>
	)
}