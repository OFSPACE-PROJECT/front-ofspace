import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useToggle from "../../costumHooks/useToggle";
import {useSelector} from "react-redux";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { TextField} from "@mui/material";
import { useEffect} from "react";


function createDataComplex(id, name, address, longitude, latitude,) {
	return {
		id,
		name,
		address,
		longitude,
		latitude
	};
}

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
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'ID',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{
		id: 'address',
		numeric: false,
		disablePadding: true,
		label: 'Address',
	},
	{
		id: 'longitude',
		numeric: false,
		disablePadding: true,
		label: 'Longitude',
	},
	{
		id: 'latitude',
		numeric: false,
		disablePadding: true,
		label: 'Latitude',
	},
];

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
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric ? 'right' : 'left'}
						align='center'
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
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	// const [getSearch, setSearch] = React.useState('')
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

			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Accessibility Data
			</Typography>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

function EditToolbar(props) {
	const { selectedCellParams, apiRef, setSelectedCellParams } = props;

	const handleClick = async () => {
		if (!selectedCellParams) {
			return;
		}
		const { id, field, cellMode } = selectedCellParams;
		if (cellMode === 'edit') {
			// Wait for the validation to run
			const isValid = await apiRef.current.commitCellChange({ id, field });
			if (isValid) {
				apiRef.current.setCellMode(id, field, 'view');
				setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
			}
		} else {
			apiRef.current.setCellMode(id, field, 'edit');
			setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
		}
	};

	const handleMouseDown = (event) => {
		// Keep the focus in the cell
		event.preventDefault();
	};

	return (
		<Box
			sx={{
				justifyContent: 'center',
				display: 'flex',
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			<Button
				onClick={handleClick}
				onMouseDown={handleMouseDown}
				disabled={!selectedCellParams}
				color="primary"
			>
				{selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
			</Button>
		</Box>
	);
}

EditToolbar.propTypes = {
	apiRef: PropTypes.shape({
		current: PropTypes.object.isRequired,
	}).isRequired,
	selectedCellParams: PropTypes.any,
	setSelectedCellParams: PropTypes.func.isRequired,
};

export default function Access() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [isOn, toggleIsOn] = useToggle();
	const [newName, setNewName]= React.useState("");
	const [newLongitude, setNewLongitude] = React.useState("");
	const [newAddress, setNewAddress] =React.useState("")
	const [newLatitude, setNewLatitude] = React.useState("")
	const [access, setAccess]= React.useState([])
	const user = useSelector((state) => state.persistedReducer?.user);

	useEffect(() => {

		const loadFacilities = async () => {
			const response = await axios.get('http://3.142.49.13:8080/accessibility', { headers: {"Authorization" : `Bearer ${user.token}`}})
			setAccess(response.data?.data)
		}
		loadFacilities()

	}, []);

	var rows = access.map(facility =>(createDataComplex(facility.id, facility.name, facility.address, facility.longitude, facility.latitude)))

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


	const handleRefreshData = async () => {
		const response = await axios.get('http://3.142.49.13:8080/accessibility', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setAccess(response.data?.data)
	}

	const handleAdd = async () => {
		toggleIsOn()
	}

	const handleCreateAccess = () => {

		axios
			.post(
				`http://3.142.49.13:8080/accessibility`,
				{
					name: newName,
					address: newAddress,
					longitude: newLongitude,
					latitude: newLatitude,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('create accessibility success');
				// setLoading(false);
			})
			.catch(function (error) {
				alert('create accessibility failed');
				// setError(error);
				// setLoading(false);
			});
		handleRefreshData()
		setNewName('')
		setNewAddress("")
		setNewLongitude('')
		setNewLatitude('')
	}
	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
			<div style={{marginTop:"3%", width:"95%", marginLeft:"-4%"}}>
				<Box sx={{ width: '100%' }}>
					<Paper sx={{ width: '100%', mb: 2 }}>
						<Button variant="outlined" onClick={()=> {
							(handleAdd()); handleRefreshData()
						}} style={{color:'white', borderColor:'white'}}>Add</Button>
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
													key={Math.random()}
													// selected={isItemSelected}
												>
													<TableCell
														component="th"
														id={labelId}
														scope="row"
														align="left"
														// padding="none"
													>
														{row.id}
													</TableCell>
													<TableCell align="left" >{row.name}</TableCell>
													<TableCell align="left" >{row.address}</TableCell>
													<TableCell align="left" >{row.longitude}</TableCell>
													<TableCell align="left" >{row.latitude}</TableCell>
													<TableCell ></TableCell>
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
			{isOn? <Box display='flex' mb={10}>
				<TextField onChange={(e)=> setNewName(e.target.value)} label="Name" variant="outlined" name="name" value={newName}/>
				<TextField onChange={(e)=> setNewAddress(e.target.value)} multiline rows={4} label="Address" variant="outlined" name="address" value={newAddress}/>
				<TextField onChange={(e)=> setNewLongitude(e.target.value)} label="Longitude" variant="outlined" name="longitude" value={newLongitude}/>
				<TextField onChange={(e)=> setNewLatitude(e.target.value)} label="Latitude" variant="outlined" name="latitude" value={newLatitude}/>
				<Box>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=> {
						setNewName('');
						setNewAddress('');
						setNewLongitude('');
						setNewLatitude('');
					}}>Cancel</Button>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=>handleCreateAccess()}>Save</Button></Box>
			</Box>: null}
		</div>
	)
}