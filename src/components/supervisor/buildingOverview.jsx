import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from "@mui/material/Button";
import {styled} from "@mui/styles";
import {InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import {Fragment} from "react";
import useToggle from "../../costumHooks/useToggle";


function createData(name, building_id, unit_type, total_unit, unit_remaining) {
	return {
		name,
		building_id,
		unit_type,
		total_unit,
		unit_remaining
	};
}

function createDetail(building_name, photo, description, building_size, floor_count, average_floor, office_hours, parking, toilets, lifts, year_constructed ) {
	return {
		building_name, photo, description, building_size, floor_count, average_floor, office_hours, parking, toilets, lifts, year_constructed
	};
}

const rows = [
	createData('Cupcake', 305, 'Office', 67, 4.3),
	createData('Donut', 452, 'Office', 51, 4.9),
	createData('Eclair', 262, 'Office', 24, 6.0),
	createData('Frozen yoghurt', 159, 'Coworking Space', 24, 4.0),
	createData('Gingerbread', 356, 'Office', 49, 3.9),
	createData('Honeycomb', 408, 'Coworking Space', 87, 6.5),
	createData('Ice cream sandwich', 237, 'Coworking Space', 37, 4.3),
	createData('Jelly Bean', 375, 'Coworking Space', 94, 0.0),
	createData('KitKat', 518, 'Coworking Space', 65, 7.0),
	createData('Lollipop', 392, 'Coworking Space', 98, 0.0),
	createData('Marshmallow', 318, 'Coworking Space', 81, 2.0),
	createData('Nougat', 360, 'Coworking Space', 9, 37.0),
	createData('Oreo', 437, 'Coworking Space', 63, 4.0),
];

const rows2 = [
	createDetail('Cupcake', "photourl.com", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
		300, 10, 30, "Lorem ipsum dolor sit amet, consectetuer", "dolor sit amet, consectetuer", "Lorem ipsum dolor sit amet, consectetuer", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit", 2000),
];

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));


function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Building Name',
	},
	{
		id: 'building_id',
		numeric: true,
		disablePadding: false,
		label: 'Building ID',
	},
	{
		id: 'unit_type',
		numeric: false,
		disablePadding: false,
		label: 'Unit Type',
	},
	{
		id: 'total_unit',
		numeric: true,
		disablePadding: false,
		label: 'Total Unit',
	},
	{
		id: 'unit_remaining',
		numeric: true,
		disablePadding: false,
		label: 'Unit Remaining',
	},
];

// const headCells2 = [
// 	{
// 		id: 'building_name',
// 		numeric: false,
// 		disablePadding: true,
// 		label: 'Building Name',
// 	},
// 	{
// 		id: 'description',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Description',
// 	},
// 	{
// 		id: 'building_size',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Building Size',
// 	},
// 	{
// 		id: 'floor_count',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Floor Count',
// 	},
// 	{
// 		id: 'average_floor',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Average Floor Plate',
// 	},
// 	{
// 		id: 'office_hours',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Office Hours',
// 	},
// 	{
// 		id: 'parking',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Parking',
// 	},
// 	{
// 		id: 'toilets',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Toilets',
// 	},
// 	{
// 		id: 'lifts',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Lifts',
// 	},
// 	{
// 		id: 'year_constructed',
// 		numeric: false,
// 		disablePadding: false,
// 		label: 'Year Constructed',
// 	},
// ];

function EnhancedTableHead(props) {
	// const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
	const { order, orderBy, rowCount, onRequestSort } =
		props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{/*<TableCell padding="checkbox">*/}
				{/*	<Checkbox*/}
				{/*		color="primary"*/}
				{/*		indeterminate={numSelected > 0 && numSelected < rowCount}*/}
				{/*		checked={rowCount > 0 && numSelected === rowCount}*/}
				{/*		onChange={onSelectAllClick}*/}
				{/*		inputProps={{*/}
				{/*			'aria-label': 'select all desserts',*/}
				{/*		}}*/}
				{/*	/>*/}
				{/*</TableCell>*/}
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric ? 'right' : 'left'}
						align='right'
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell align="center">Detail</TableCell>
			</TableRow>
		</TableHead>
	);
}



EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>
			{/*{numSelected > 0 ? (*/}
			{/*	<Typography*/}
			{/*		sx={{ flex: '1 1 100%' }}*/}
			{/*		color="inherit"*/}
			{/*		variant="subtitle1"*/}
			{/*		component="div"*/}
			{/*	>*/}
			{/*		{numSelected} selected*/}
			{/*	</Typography>*/}
			{/*) : (*/}
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Building Overview
			</Typography>
			{/*)}*/}

			{/*{numSelected > 0 ? (*/}
			{/*) : (*/}
			<Search>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder="Search by Name…"
					inputProps={{ 'aria-label': 'search' }}
				/>
			</Search>
			{/*)}*/}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function ComplexOverview(){
	const [isOn, toggleIsOn] = useToggle();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	//for table detail
	const [order2, setOrder2] = React.useState('asc');
	const [orderBy2, setOrderBy2] = React.useState('calories');
	// const [selected, setSelected] = React.useState([]);
	const [page2, setPage2] = React.useState(0);
	const [dens2e, setDense2] = React.useState(false);
	const [rowsPerPage2, setRowsPerPage2] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleRequestSort2 = (event, property) => {
		const isAsc = orderBy2 === property && order2 === 'asc';
		setOrder2(isAsc ? 'desc' : 'asc');
		setOrderBy2(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleEditClick = (e) => {
		toggleIsOn();

	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangePage2 = (event, newPage) => {
		setPage2(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleChangeRowsPerPage2 = (event) => {
		setRowsPerPage2(parseInt(event.target.value, 10));
		setPage2(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};
	const handleChangeDense2 = (event) => {
		setDense2(event.target.checked);
	};

	// const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
	const emptyRows2 =
		page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - rows.length) : 0;

	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
			<div style={{marginTop:"3%", width:"90%", marginRight:"5%"}}>
				<Box sx={{ width: '100%' }}>
					<Paper sx={{ width: '100%', mb: 2 }}>
						<EnhancedTableToolbar numSelected={selected.length} />
						{/*<EnhancedTableToolbar  />*/}
						<TableContainer>
							<Table
								sx={{ minWidth: 750 }}
								aria-labelledby="tableTitle"
								size={dense ? 'small' : 'medium'}
							>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									// onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={rows.length}
								/>
								<TableBody>
									{/* if you don't need to support IE11, you can replace the `stableSort` call with:
			 rows.slice().sort(getComparator(order, orderBy)) */}
									{stableSort(rows, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											// const isItemSelected = isSelected(row.name);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													// onClick={(event) => handleClick(event, row.name)}
													role="checkbox"
													// aria-checked={isItemSelected}
													tabIndex={-1}
													key={row.name}
													// selected={isItemSelected}
												>
													{/*<TableCell padding="checkbox">*/}
													{/*	<Checkbox*/}
													{/*		color="primary"*/}
													{/*		checked={isItemSelected}*/}
													{/*		inputProps={{*/}
													{/*			'aria-labelledby': labelId,*/}
													{/*		}}*/}
													{/*	/>*/}
													{/*</TableCell>*/}
													<TableCell
														component="th"
														id={labelId}
														scope="row"
														// padding="none"
													>
														{row.name}
													</TableCell>
													<TableCell align="right">{row.building_id}</TableCell>
													<TableCell align="right">{row.unit_type}</TableCell>
													<TableCell align="right">{row.total_unit}</TableCell>
													<TableCell align="right">{row.unit_remaining}</TableCell>
													<TableCell ><Button variant="outlined" onClick={()=>(handleEditClick())}	style={{color:'white', borderColor:'white'}}>Edit Building</Button></TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											style={{
												height: (dense ? 33 : 53) * emptyRows,
											}}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
					<FormControlLabel
						control={<Switch checked={dense} onChange={handleChangeDense} />}
						label="Dense padding"
					/>
				</Box>
			</div>
			{isOn ?
				<div style={{marginTop:"3%", width:"90%", marginRight:"5%"}}>
					<Box sx={{ width: '100%' }}>
						<Paper sx={{ width: '100%', mb: 2 }}>
							{/*<EnhancedTableToolbar numSelected={selected.length} />*/}
							<TableContainer>
								<Table sx={{ minWidth: 750 }}
									   aria-labelledby="tableTitle"
									   size={dense ? 'small' : 'medium'}>

									<TableRow>
										<TableCell variant="head">Building Name</TableCell>
										<TableCell>{rows2[0].building_name}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Building Photo</TableCell>
										<TableCell>{rows2[0].photo}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Description</TableCell>
										<TableCell>{rows2[0].description}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Building Size</TableCell>
										<TableCell>{rows2[0].building_size}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Floor Count</TableCell>
										<TableCell>{rows2[0].floor_count}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Average Floor Plate</TableCell>
										<TableCell>{rows2[0].average_floor}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Office Hours</TableCell>
										<TableCell>{rows2[0].office_hours}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Parking</TableCell>
										<TableCell>{rows2[0].parking}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Toilets</TableCell>
										<TableCell>{rows2[0].toilets}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Lifts</TableCell>
										<TableCell>{rows2[0].lifts}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Year Constructed</TableCell>
										<TableCell>{rows2[0].year_constructed}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Exterior Photos</TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Detail Photo</Button></TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
								</Table>
							</TableContainer>
						</Paper>
						<FormControlLabel
							control={<Switch checked={dense} onChange={handleChangeDense} />}
							label="Dense padding"
						/>
					</Box>
				</div> : null}
		</div>
	)
}