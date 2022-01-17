import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {TextField} from "@mui/material";
import {
	Chart,
	BarSeries,
	Title,
	ArgumentAxis,
	ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import Typography from "@mui/material/Typography";


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function SalesOverview() {
	const chartData = [
		{ year: '1950', population: 2.525 },
		{ year: '1960', population: 3.018 },
		{ year: '1970', population: 3.682 },
		{ year: '1980', population: 4.440 },
		{ year: '1980', population: 4.440 },
		{ year: '1990', population: 5.310 },
		{ year: '2000', population: 6.127 },
		{ year: '2010', population: 6.930 },
	];
	let value = 0;
	return (
		// <Box sx={{ width: '100%' }}>
		<Box>
			<Typography color="white" fontSize={20} align="center">Sales Overview</Typography>
			<TextField
				// mt={30}

				id="date"
				label="Select Date"
				type="date"
				defaultValue="2022-01-01"
				sx={{ width: 200}}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={3}>
					<Item>Total Booking: {value}</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>Total Payment Confirmed: {value}</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>Total Rent Completed: {value}</Item>
				</Grid>
				<Grid item xs={3}>
					<Item>Total Booking Canceled: {value}</Item>
				</Grid>
			</Grid>
			{/*<Paper>*/}
				<Chart
					data={chartData}
					style={{marginTop:"3%", width:"80%", height:"30px"}}
				>
					<ArgumentAxis />
					<ValueAxis max={7} />

					<BarSeries
						valueField="population"
						argumentField="year"
					/>
					<Title text="Sales per Month" />
					<Animation />
				</Chart>
			{/*</Paper>*/}
		</Box>
	);
}
