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
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Fragment, useEffect} from "react";


function createDataUser(id, name, phone, email, role, admin_status) {
	return {
		id,
		name,
		phone,
		email,
		role,
		admin_status,
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
		id: 'role',
		numeric: false,
		disablePadding: false,
		label: 'Role',
	},
	{
		id: 'admin_status',
		numeric: false,
		disablePadding: false,
		label: 'Admin Status',
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
				User Data
			</Typography>
			{/*<Search>*/}
			{/*	<SearchIconWrapper>*/}
			{/*		<SearchIcon />*/}
			{/*	</SearchIconWrapper>*/}
			{/*	<StyledInputBase*/}
			{/*		placeholder="Search by Name…"*/}
			{/*		inputProps={{ 'aria-label': 'search' }}*/}
			{/*		value={getSearch}*/}
			{/*		onChange={(e)=>setSearch(e.target.value)}*/}

			{/*	/>*/}
			{/*</Search>*/}
			{/*)}*/}
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
	const [isEdit1, setEdit1] = React.useState(false);
	const [isEdit2, setEdit2] = React.useState(false);
	const [users, setUsers] = React.useState([])
	const [userOne, setUserOne] = React.useState([])
	const user = useSelector((state) => state.persistedReducer?.user);

	useEffect(() => {

		const loadUser = async () => {
			const response = await axios.get('http://3.142.49.13:8080/user', { headers: {"Authorization" : `Bearer ${user.token}`}})
			setUsers(response.data?.data)
		}
		loadUser()

	}, []);

	var rows = users.map(user=>(createDataUser(user.id, user.name, user.phone, user.email, user.role, user.admin_status)))

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
		for (let i = 0; i < users.length; i++) {
			if (bId == users[i].id) {
				setUserOne(users[i]);
			}
		}
		toggleIsOn();

	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleInputChange = (e) => {
		// setDisable(false);

		const { name, value } = e.target;
		setUserOne(userOne => ({
			...userOne,
			[name]: value
		}));
	};

	const handleRefreshData = async () => {
		const response = await axios.get('http://3.142.49.13:8080/user', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setUsers(response.data?.data)
	}
	const handleEdit1 = async () => {
		setEdit1(!isEdit1)
		const response = await axios.get('http://3.142.49.13:8080/user', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setUsers(response.data?.data)

	}
	const handleEdit2 = async () => {
		setEdit2(!isEdit2)
		const response = await axios.get('http://3.142.49.13:8080/user', { headers: {"Authorization" : `Bearer ${user.token}`}})
		setUsers(response.data?.data)

	}

	console.log("this user", users)

	const handleUpdate1 = () => {

		axios
			.put(
				`http://3.142.49.13:8080/user`,
				{
					id: userOne.id,
					role: userOne.role,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update user success');
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
				`http://3.142.49.13:8080/user`,
				{
					id: userOne.id,
					role: userOne.admin_status,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				alert('update user success');
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
													<TableCell align="left" >{row.name.toUpperCase()}</TableCell>
													<TableCell align="left" >{row.phone}</TableCell>
													<TableCell align="left" >{row.email}</TableCell>
													<TableCell align="left">{row.role.toUpperCase()}</TableCell>
													<TableCell align="left">{row.admin_status.toUpperCase()}</TableCell>
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
							{/*<EnhancedTableToolbar numSelected={selected.length} />*/}
							<TableContainer>
								<Table sx={{ minWidth: 750 }}
									   aria-labelledby="tableTitle"
									   size={dense ? 'small' : 'medium'}>
									{/*<div style={{ height: 400, width: '100%' }}>*/}

									<TableRow>
										<TableCell variant="head">Name</TableCell>
										<TableCell>{userOne.name}</TableCell>
										<TableCell ></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Role</TableCell>
										{isEdit1 === true ?
											<TableCell>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={userOne.role}
													label="Set Role"
													name="role"
													onChange={(e)=> handleInputChange(e)}
												>
													<MenuItem value="costumer">Costumer</MenuItem>
													<MenuItem value="supervisor">Supervisor</MenuItem>
													<MenuItem value="team_ofspace">Team Ofspace</MenuItem>
												</Select>
											</TableCell>
											: <TableCell>{userOne.role}</TableCell>}
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
													value={userOne.admin_status}
													label="Set Status"
													name="admin_status"
													onChange={(e)=> handleInputChange(e)}
												>
													<MenuItem value="verified">Verified</MenuItem>
													<MenuItem value="unverified">Unverified</MenuItem>
												</Select>
											</TableCell>
											: <TableCell>{userOne.admin_status}</TableCell>}
										{isEdit2 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit2(); handleUpdate2();}}>Save</Button></TableCell></Fragment>}
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