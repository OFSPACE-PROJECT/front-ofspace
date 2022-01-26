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
import {Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Fragment, useEffect} from "react";


function createDataComplex(id, name, address, longitude, latitude) {
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
		disablePadding: false,
		label: 'Adress',
	},
	{
		id: 'longitude',
		numeric: false,
		disablePadding: false,
		label: 'Longitude',
	},
	{
		id: 'latitude',
		numeric: false,
		disablePadding: false,
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
				<TableCell align="center">Detail</TableCell>
				<TableCell align="center"></TableCell>
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
	// const requestSearch = (searchedVal: string) => {
	// 	const filteredRows = props.rows.filter((row) => {
	// 		return row.name.toLowerCase().includes(searchedVal.toLowerCase());
	// 	});
	// 	props.setRows2(filteredRows);
	// };
	//
	// const cancelSearch = () => {
	// 	setSearch("");
	// 	requestSearch(getSearch);
	// };


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
				Complex Data
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

export default function UserData() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [isOn, toggleIsOn] = useToggle();
	const [isAddOn, toggleAddIsOn] = useToggle();
	const [newName, setNewName]= React.useState("");
	const [newLongitude, setNewLongitude] = React.useState("");
	const [newAddress, setNewAddress] =React.useState("")
	const [newLatitude, setNewLatitude] = React.useState("")
	const [isEdit1, setEdit1] = React.useState(false);
	const [isEdit2, setEdit2] = React.useState(false);
	const [isEdit3, setEdit3] = React.useState(false);
	const [isEdit4, setEdit4] = React.useState(false);
	const [isEdit5, setEdit5] = React.useState(false);
	const [isEdit6, setEdit6] = React.useState(false);
	const [complexes, setComplexes] = React.useState([])
	const [complexOne, setComplexOne] = React.useState([])
	const user = useSelector((state) => state.persistedReducer?.user);

	useEffect(() => {

		const loadComplex = async () => {
			const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
			setComplexes(response.data?.data)
		}
		loadComplex()

	}, []);

	var rows = complexes.map(complex=>(createDataComplex(complex.id, complex.name, complex.address, complex.longitude, complex.latitude)))

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
	const handleEditClick = (e) => {
		let bId = e.target.id;
		console.log(bId)
		for (let i = 0; i < complexes.length; i++) {
			if (bId == complexes[i].id) {
				setComplexOne(complexes[i]);
			}
		}
		toggleIsOn();

	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleInputChange = (e) => {
		// setDisable(false);

		const { name, value } = e.target;
		setComplexOne(complexOne => ({
			...complexOne,
			[name]: value
		}));
	};

	const handleAdd = async () => {
		toggleAddIsOn()
	}

	const handleRefreshData = async () => {
		const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setComplexes(response.data?.data)
	}
	const handleEdit1 = async () => {
		setEdit1(!isEdit1)
		const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setComplexes(response.data?.data)

	}
	const handleEdit2 = async () => {
		setEdit2(!isEdit2)
		const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setComplexes(response.data?.data)
	}


	const handleEdit3 = async () => {
		setEdit3(!isEdit3)
		const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setComplexes(response.data?.data)
	}

	const handleEdit4 = async () => {
		setEdit4(!isEdit4)
		const response = await axios.get('http://3.142.49.13:8080/complex', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setComplexes(response.data?.data)
	}
	const handleUpdate1 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/complex`,
				{
					id: complexOne.id,
					role: complexOne.name,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update complex success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}
	const handleUpdate2 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/complex`,
				{
					id: complexOne.id,
					role: complexOne.address,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update complex success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}
	const handleUpdate3 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/complex`,
				{
					id: complexOne.id,
					role: complexOne.longitude,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update complex success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}
	const handleUpdate4 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/complex`,
				{
					id: complexOne.id,
					role: complexOne.latitude,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update complex success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}

	const handleCreateComplex = () => {

		axios
			.post(
				`http://3.142.49.13:8080/complex`,
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
				alert('create complex success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
		handleRefreshData()
	}
	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
			<div style={{marginTop:"3%", width:"95%", marginLeft:"-4%"}}>
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
													<TableCell align="left">{row.latitude}</TableCell>
													<TableCell ><Button variant="outlined"  id={row.id} onClick={(e)=>(handleEditClick(e))} style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
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
				(<div style={{marginTop:"3%", width:"90%", marginRight:"5%"}}>
					<Box sx={{ width: '100%' }}>
						<Paper sx={{ width: '100%', mb: 2 }}>
							<Button variant="outlined" onClick={()=> {
								(handleAdd()); handleRefreshData()
							}} style={{color:'white', borderColor:'white'}}>Add New</Button>
							{/*<EnhancedTableToolbar numSelected={selected.length} />*/}
							<TableContainer>
								<Table sx={{ minWidth: 750 }}
									   aria-labelledby="tableTitle"
									   size={dense ? 'small' : 'medium'}>
									{/*<div style={{ height: 400, width: '100%' }}>*/}
									<TableRow>
										<TableCell variant="head">Name</TableCell>
										{isEdit1 === true ?
											<TableCell>
												<TextField id="outlined-basic" onChange={(e)=> handleInputChange(e)} label="Name" variant="outlined" name="name" value={complexOne.name}/>
											</TableCell>
											: <TableCell>{complexOne.name}</TableCell>}
										{isEdit1 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit1(); handleUpdate1();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Address</TableCell>
										{isEdit2 === true ?
											<TableCell>
												<TextField onChange={(e)=> handleInputChange(e)} label="Address" multiline rows={4} variant="outlined" name="address" value={complexOne.address}/>
											</TableCell>
											: <TableCell>{complexOne.address}</TableCell>}
										{isEdit2 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit2(); handleUpdate2();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Longitude</TableCell>
										{isEdit3 === true ?
											<TableCell>
												<TextField onChange={(e)=> handleInputChange(e)} label="Longitude" variant="outlined" name="longitude" value={complexOne.longitude}/>
											</TableCell>
											: <TableCell>{complexOne.longitude}</TableCell>}
										{isEdit3 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit3(); handleUpdate3();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Latitude</TableCell>
										{isEdit4 === true ?
											<TableCell>
												<TextField onChange={(e)=> handleInputChange(e)} label="Latitude" variant="outlined" name="latitude" value={complexOne.latitude}/>
											</TableCell>
											: <TableCell>{complexOne.latitude}</TableCell>}
										{isEdit4 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit4(); handleUpdate4();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableCell ></TableCell>
								</Table>
							</TableContainer>
						</Paper>
						<FormControlLabel
							control={<Switch checked={dense} onChange={handleChangeDense} />}
							label="Dense padding"
						/>

					</Box>
					{/*: null}*/}
				</div> ): null}

			{isAddOn? <Box display='flex' mb={10}>
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
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=>handleCreateComplex()}>Save</Button></Box>
			</Box>: null}
		</div>
	)
}