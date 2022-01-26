
import {alpha} from "@mui/material/styles";
import { Select} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import useToggle from "../../costumHooks/useToggle";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem";


function createDataBooking(id, confirmed_name, phone, email, deal_date, booking_status, payment_status, unit_type, total_bought, start_date, end_date) {
	return {
		id,
		confirmed_name,
		phone,
		email,
		deal_date,
		booking_status,
		payment_status,
		unit_type,
		total_bought,
		start_date,
		end_date
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
		id: 'confirmed_name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{
		id: 'phone',
		numeric: false,
		disablePadding: false,
		label: 'Phone',
	},
	{
		id: 'email',
		numeric: false,
		disablePadding: false,
		label: 'Email',
	},
	{
		id: 'deal_date',
		numeric: false,
		disablePadding: false,
		label: 'Deal Date',
	},
	{
		id: 'booking_status',
		numeric: false,
		disablePadding: false,
		label: 'Booking Status',
	},
	{
		id: 'payment_status',
		numeric: true,
		disablePadding: false,
		label: 'Payment Status',
	},
	{
		id: 'unit_type',
		numeric: true,
		disablePadding: false,
		label: 'Unit Type',
	},
	{
		id: 'total_bought',
		numeric: true,
		disablePadding: false,
		label: 'Total Bought',
	},
	{
		id: 'start_date',
		numeric: false,
		disablePadding: false,
		label: 'Start Rent',
	},
	{
		id: 'end_date',
		numeric: false,
		disablePadding: false,
		label: 'End Rent',
	},
];



function EnhancedTableHead(props) {
	// const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
	const { order, orderBy, onRequestSort } =
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
				Booking Overview
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


export default function BookingOverview() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [isOn, toggleIsOn] = useToggle();
	const [isEdit1, setEdit1] = React.useState(false);
	const [isEdit2, setEdit2] = React.useState(false);
	const [isEdit3, setEdit3] = React.useState(false);
	const [isEdit4, setEdit4] = React.useState(false);
	const [isEdit5, setEdit5] = React.useState(false);
	const [isEdit6, setEdit6] = React.useState(false);
	const [bookings, setBookings] = React.useState([])
	const [bookingOne, setBookingOne] = React.useState([])
	const user = useSelector((state) => state.persistedReducer?.user);

	//id building perlu diganti

	useEffect(() => {

		const loadBooking = async () => {
			const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
			setBookings(response.data?.data)
		}
		loadBooking()

	}, []);

	var rows = bookings.map(booking => (createDataBooking(booking.id, booking.confirmed_name, booking.user.phone, booking.user.email, booking.deal_date,booking.booking_status, booking.payment_status, booking.unit.unit_type,booking.total_bought, booking.start_date, booking.end_date)));

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
		for (let i = 0; i < bookings.length; i++) {
			if (bId == bookings[i].id) {
				setBookingOne(bookings[i]);
			}
		}
		toggleIsOn();

	}
	console.log("a", bookingOne)

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleInputChange = (e) => {
		// setDisable(false);

		const { name, value } = e.target;
		setBookingOne(bookingOne => ({
			...bookingOne,
			[name]: value
		}));
	};

	const handleRefreshData = async () => {
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)
	}
	const handleEdit1 = async () => {
		setEdit1(!isEdit1)
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)

	}
	const handleEdit2 = async () => {
		setEdit2(!isEdit2)
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)

	}

	const handleEdit3 = async () => {
		setEdit3(!isEdit3)
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)

	}

	const handleEdit4 = async () => {
		setEdit4(!isEdit4)
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)

	}

	const handleEdit5 = async () => {
		setEdit5(!isEdit5)
		const response = await axios.get('http://3.142.49.13:8080/booking/building', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":9} })
		setBookings(response.data?.data)

	}



	const handleUpdate2 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/booking`,
				{
					id: bookingOne.id,
					booking_status: bookingOne.payment_status,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update booking success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}

	const handleUpdate1 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/booking`,
				{
					id: bookingOne.id,
					booking_status: bookingOne.booking_status,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update booking success');
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
				`http://3.142.49.13:8080/booking`,
				{
					id: bookingOne.id,
					booking_status: bookingOne.total_bought,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update booking success');
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
				`http://3.142.49.13:8080/booking`,
				{
					id: bookingOne.id,
					booking_status: bookingOne.start_date,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update booking success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
	}

	const handleUpdate5 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/booking`,
				{
					id: bookingOne.id,
					booking_status: bookingOne.end_date,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update booking success');
				// setLoading(false);
			})
			.catch(function (error) {
				// setError(error);
				// setLoading(false);
			});
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
													<TableCell align="left" >{row.confirmed_name}</TableCell>
													<TableCell align="left" >{row.phone}</TableCell>
													<TableCell align="left" >{row.email}</TableCell>
													<TableCell align="left">{row.deal_date}</TableCell>
													<TableCell align="left">{row.booking_status}</TableCell>
													<TableCell align="left">{row.payment_status}</TableCell>
													<TableCell align="left">{row.unit_type}</TableCell>
													<TableCell align="left">{row.total_bought}</TableCell>
													<TableCell align="left">{row.start_date}</TableCell>
													<TableCell align="left">{row.end_date}</TableCell>
													<TableCell ><Button variant="outlined"  id={row.id} onClick={(e)=>(handleEditClick(e))} style={{color:'white', borderColor:'white'}}>Edit Booking</Button></TableCell>
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
							{/*<EnhancedTableToolbar numSelected={selected.length} />*/}
							<TableContainer>
								<Table sx={{ minWidth: 750 }}
									   aria-labelledby="tableTitle"
									   size={dense ? 'small' : 'medium'}>
									{/*<div style={{ height: 400, width: '100%' }}>*/}

									<TableRow>
										<TableCell variant="head">Name</TableCell>
										<TableCell>{bookingOne.confirmed_name}</TableCell>
										<TableCell ></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Booking Status</TableCell>
										{isEdit1 === true ?
											<TableCell>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={bookingOne.booking_status}
													label="Set Status"
													name="booking_status"
													onChange={(e)=> handleInputChange(e)}
												>
													<MenuItem value="deal">Deal</MenuItem>
													<MenuItem value="rented">Rented</MenuItem>
													<MenuItem value="ended">Ended</MenuItem>
													<MenuItem value="canceled">Canceled</MenuItem>
												</Select>
											</TableCell>
											: <TableCell>{bookingOne.booking_status}</TableCell>}
										{isEdit1 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit1(); handleUpdate1();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Payment Status</TableCell>
										{isEdit2 === true ?
											<TableCell>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={bookingOne.payment_status}
													label="Set Status"
													name="payment_status"
													onChange={(e)=> handleInputChange(e)}
												>
													<MenuItem value="confirmed">Confirmed</MenuItem>
													<MenuItem value="unconfirmed">Unconfirmed</MenuItem>
												</Select>
											</TableCell>
											: <TableCell>{bookingOne.payment_status}</TableCell>}
										{isEdit2 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit2(); handleUpdate2();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Total Bought</TableCell>
										{isEdit3 === true ?
											<TableCell>
												<input
													value={bookingOne.total_bought}
													name="total_bought"
													type="number"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{bookingOne.total_bought}</TableCell>}
										{isEdit3 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit3(); handleUpdate3();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Start Rent</TableCell>
										{isEdit4 === true ?
											<TableCell>
												<input
													value={bookingOne.start_date}
													name="start_date"
													type="date"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{bookingOne.start_date}</TableCell>}
										{isEdit4 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit4(); handleUpdate4();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">End Rent</TableCell>
										{isEdit5 === true ?
											<TableCell>
												<input
													value={bookingOne.end_date}
													name="end_date"
													type="date"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{bookingOne.end_date}</TableCell>}
										{isEdit5 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit5}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit5}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit5(); handleUpdate5();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
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
		</div>
	)

}