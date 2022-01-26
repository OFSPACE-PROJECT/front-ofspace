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
import {InputBase, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import {Fragment, useEffect, useRef} from "react";
import useToggle from "../../costumHooks/useToggle";
import axios from "axios";
import {useSelector} from "react-redux";
import { useGridApiRef, DataGridPro } from '@mui/x-data-grid-pro';
import {login} from "../../store/userSlice";
import storage from "../../services/firebase";
import ModalPhoto from "./modalPhoto";
import { v4 as uuidv4 } from 'uuid';
import {Autocomplete} from "@mui/lab";
import ModalPhotoInterior from "./modalPhotoInterior";
import ModalPhotoFloor from "./modalPhotoFloor";


function createData(name, building_id, unit_type, unit_id, total_unit, unit_remaining) {
	return {
		name,
		building_id,
		unit_type,
		unit_id,
		total_unit,
		unit_remaining
	};
}


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
		id: 'unit_id',
		numeric: false,
		disablePadding: false,
		label: 'Unit ID',
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
				Building Overview
			</Typography>
			{/*<Search>*/}
			{/*	<SearchIconWrapper>*/}
			{/*		<SearchIcon />*/}
			{/*	</SearchIconWrapper>*/}
			{/*	<StyledInputBase*/}
			{/*		placeholder="Search by Name…"*/}
			{/*		inputProps={{ 'aria-label': 'search' }}*/}
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

export default function BuildingOverview(){
	const [editRowsModel, setEditRowsModel] = React.useState({});

	const handleEditRowsModelChange = React.useCallback((model) => {
		setEditRowsModel(model);
	}, []);
	const [isOn, toggleIsOn] = useToggle();
	const [isOnUnit, toggleIsOnUnit] = useToggle();
	const [isFacOn, toggleIsFacOn] = useToggle();
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
	const [dense2, setDense2] = React.useState(false);
	const [rowsPerPage2, setRowsPerPage2] = React.useState(5);

	const [buildings, setBuildings] = React.useState([])
	const [exterior, setExterior] = React.useState([])
	const [interior, setInterior] = React.useState([])
	const [floor, setFloor] = React.useState([])
	const [isExteriorOn, toggleExteriorOn] = useToggle();
	const [isInteriorOn, toggleInteriorOn] = useToggle();
	const [isFloorOn, toggleFloorOn] = useToggle();
	const [units, setUnits] = React.useState([])
	const [unitId, setUnitId] = React.useState(0)
	const [unitOne, setUnitOne] = React.useState([])
	const apiRef = useGridApiRef();
	const [selectedCellParams, setSelectedCellParams] = React.useState(null);
	const user = useSelector((state) => state.persistedReducer?.user);
	const [disable, setDisable] = React.useState(true);
	const [isEditBuildingName, setEditBuildingName] = React.useState(false);
	const [isEditBuilding2, setEditBuilding2] = React.useState(false);
	const [imageUrl, setImageUrl] = React.useState('');
	const [selectedImage, setSelectedImage] = React.useState(null)
	const [selectedExteriorImage, setSelectedExteriorImage] = React.useState(null)
	const [selectedInteriorImage, setSelectedInteriorImage] = React.useState(null)
	const [selectedFloorImage, setSelectedFloorImage] = React.useState(null)
	const [descriptionExterior, setDescriptionExterior] = React.useState('')
	const [descriptionInterior, setDescriptionInterior] = React.useState('')
	const [descriptionFloor, setDescriptionFloor] = React.useState('')
	const [isEditBuilding3, setEditBuilding3] = React.useState(false);
	const [isEditBuilding4, setEditBuilding4] = React.useState(false);
	const [isEditBuilding5, setEditBuilding5] = React.useState(false);
	const [isEditBuilding6, setEditBuilding6] = React.useState(false);
	const [isEditBuilding7, setEditBuilding7] = React.useState(false);
	const [isEditBuilding8, setEditBuilding8] = React.useState(false);
	const [isEditBuilding9, setEditBuilding9] = React.useState(false);
	const [isEditBuilding10, setEditBuilding10] = React.useState(false);
	const [isEdit1, setEdit1] = React.useState(false);
	const [isEdit2, setEdit2] = React.useState(false);
	const [isEdit3, setEdit3] = React.useState(false);
	const [isEdit4, setEdit4] = React.useState(false);
	const [isEdit5, setEdit5] = React.useState(false);
	const [isEdit6, setEdit6] = React.useState(false);
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [isAddOn, toggleAddOn] = useToggle();
	const [isAddFacilityOn, toggleAddFacilityOn] = useToggle();
	const [isAddUnitFacilityOn, toggleAddUnitFacilityOn] = useToggle();
	const [isAddInterior, toggleAddInteriorOn] = useToggle();
	const [isAddFloor, toggleAddFloorOn] = useToggle();
	const [isFacilityOn, toggleShowFacilityOn] = useToggle();
	const [isUnitFacilityOn, toggleShowUnitFacilityOn] = useToggle();
	const [buildingFacilities, setBuildingFacilities] = React.useState([])
	const [unitFacilities, setUnitFacilities] = React.useState([])
	const [globalFacilities, setGlobalFacilities] = React.useState([])
	const [addFacility, setAddFacility] = React.useState('')
	const [addFacilityUnit, setAddFacilityUnit] = React.useState('')
	const [open, setOpen] = React.useState(false);
	const [openInterior, setOpenInterior] = React.useState(false);
	const [openFloor, setOpenFloor] = React.useState(false);
	useEffect(() => {

		const loadBuilding = async () => {
			const response = await axios.get('http://3.142.49.13:8080/building/9', { headers: {"Authorization" : `Bearer ${user.token}`} })
			setBuildings(response.data?.data)
			console.log("geett:", response.data?.data)
		}
		const loadAllUnitOnBuilding = async () => {
			const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{building_id:9} })
			setUnits(response.data?.data)
			console.log("unitss:", response.data?.data)
		}
		const loadGlobalFacilities = async () => {
			const response = await axios.get('http://3.142.49.13:8080/facility', { headers: {"Authorization" : `Bearer ${user.token}`} })
			setGlobalFacilities(response.data?.data)
			console.log("all facility", response.data?.data)
		}
		loadBuilding()
		loadAllUnitOnBuilding()
		loadGlobalFacilities()

		}, []);

	console.log("this token", user.token)
	var rows = units.map(unit => (createData(buildings.name, buildings.id, unit.unit_type, unit.id, unit.total_unit, unit.remaining_unit)));


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


	const handleCellClick = React.useCallback((params) => {
		setSelectedCellParams(params);
	}, []);

	const handleDoubleCellClick = React.useCallback((params, event) => {
		event.defaultMuiPrevented = true;
	}, []);


	const handleEditClick = (e) => {
		toggleIsOn();

	}
	const handleEditBuildingName = async () => {
		setEditBuildingName(!isEditBuildingName)
			const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
			setBuildings(response.data?.data)

	}
	const handleEditBuilding2 = async () => {
		setEditBuilding2(!isEditBuilding2)

		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding3 = async () => {
		setEditBuilding3(!isEditBuilding3)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding4 = async () => {
		setEditBuilding4(!isEditBuilding4)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding5 = async () => {
		setEditBuilding5(!isEditBuilding5)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding6 = async () => {
		setEditBuilding6(!isEditBuilding6)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding7 = async () => {
		setEditBuilding7(!isEditBuilding7)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding8 = async () => {
		setEditBuilding8(!isEditBuilding8)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding9 = async () => {
		setEditBuilding9(!isEditBuilding9)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleEditBuilding10 = async () => {
		setEditBuilding10(!isEditBuilding10)
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}
	const handleRefreshData = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setBuildings(response.data?.data)
	}


	const handleGetExteriorPhoto = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}/exterior`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setExterior(response.data?.data)
		if (response.data?.data === null) {
			return alert("Tidak ada floor photo, harap tambahkan foto")
		}
		toggleExteriorOn()
	}

	const handleGetInteriorPhoto = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/unit/${unitOne.id}/interior`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setInterior(response.data?.data)
		if (response.data?.data === null) {
			return alert("Tidak ada interior photo, harap tambahkan foto")
		}
		toggleInteriorOn()}

	const handleGetFloorPhoto = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}/floor`, { headers: {"Authorization" : `Bearer ${user.token}`} })
		setFloor(response.data?.data)
		if (response.data?.data === null) {
			return alert("Tidak ada floor photo, harap tambahkan foto")
		}
		toggleFloorOn()
	}

	const handleRefreshDataUnit = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/unit`, { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`}})
		setBuildings(response.data?.data)
	}
	const handleEdit1 = async () => {
		setEdit1(!isEdit1)
		const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`} })
		setUnits(response.data?.data)

	}
	const handleEdit2 = async () => {
		setEdit2(!isEdit2)
		const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`} })
		setUnits(response.data?.data)
	}


	const handleEdit3 = async () => {
		setEdit3(!isEdit3)
		const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`} })
		setUnits(response.data?.data)
	}

	const handleEdit4 = async () => {
		setEdit4(!isEdit4)
		const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`} })
		setUnits(response.data?.data)
	}
	const handleEdit5 = async () => {
		setEdit5(!isEdit5)
		const response = await axios.get('http://3.142.49.13:8080/unit', { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`} })
		setUnits(response.data?.data)
	}


	const handleEditUnitClick = (e) => {

		let unitIds = e.target.id;
		for (let i = 0; i < units.length; i++) {
			 console.log("ini inside", unitIds, units[i].id)
			if (unitIds == units[i].id) {
				console.log("unit inside loop");
				setUnitOne(units[i]);
			}
		}
		toggleIsOnUnit();
	}
		console.log("ini unit", unitOne)

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

	const handleInputChange = (e) => {
		setDisable(false);

		const { name, value } = e.target;
		setBuildings(buildings => ({
			...buildings,
			[name]: value
		}));
	};

	const handleInputUnitChange = (e) => {
		setDisable(false);

		const { name, value } = e.target;
		setUnitOne(unitOne => ({
			...unitOne,
			[name]: value
		}));
	};

	const handleUpdateBuildingName = () => {

		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
					name: buildings.name,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
			})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingDescription = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
					description: buildings.description,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
			})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingAvrgFloor = () => {

		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
					average_floor_size: buildings.average_floor_size,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
			})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingSize = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
					building_size: buildings.building_size,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
			})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingLifts = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	lifts: buildings.lifts,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingOfficeHours = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	office_hours: buildings.office_hours,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingParking = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	parking: buildings.parking,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingToilets = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	toilets: buildings.toilets,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingYearConstruct = () => {
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	year_constructed: buildings.year_constructed,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateBuildingMainImage = () => {
		let reqFirebase = `/images/building/${buildings.name}`
			if(selectedImage == null)
				return;
			storage.ref(reqFirebase).put(selectedImage)
				.on("state_changed" , alert("success upload image") , alert);
		let imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Fbuilding%2F${buildings.name}?alt=media&token=42b2f2ca-e913-4fe4-82ff-9b2fdc68a037`
		axios
			.put(
				`http://3.142.49.13:8080/building`,
				{
					id: buildings.id,
	image_url: imageFromFirebase,
	},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
		setSelectedImage(null)
	}



	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleOpenInterior = () => setOpenInterior(true);
	const handleOpenFloor = () => setOpenFloor(true);
	const handleCloseFloorModal = () => setOpenInterior(false);
	const handleCloseInteriorModal = () => setOpenFloor(false);


	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
	const emptyRows2 =
		page2 > 0 ? Math.max(0, (1 + page2) * rowsPerPage2 - rows.length) : 0;

	const handleAddPhoto =() => {
		toggleAddOn()
	}

	const handleShowAddFacility =() => {
		toggleAddFacilityOn()
	}

	const handleShowAddUnitFacility =() => {
		toggleAddUnitFacilityOn()
	}

	const handleCloseExterior = () => {
		toggleAddOn()
		setSelectedExteriorImage(null)
		setDescriptionExterior('')
	}

	const handleAddInteriorPhoto =() => {
		toggleAddInteriorOn()
	}

	const handleCloseInterior = () => {
		toggleAddInteriorOn()
		setSelectedInteriorImage(null)
		setDescriptionInterior('')
	}

	const handleAddFloorPhoto =() => {
		toggleAddFloorOn()
	}

	const handleCloseFloor = () => {
		toggleAddFloorOn()
		setSelectedFloorImage(null)
		setDescriptionFloor('')
	}


	const handleCreateExterior = async () => {
		const thisId = uuidv4();
		let reqFirebase = `/images/building/${buildings.id}/exterior/${thisId}`
		if(selectedExteriorImage == null)
			return;
		storage.ref(reqFirebase).put(selectedExteriorImage)
			.on("state_changed" , alert("success upload image") , alert);
		let imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Fbuilding%2F${buildings?.id}%2Fexterior%2F${thisId}?alt=media&token=62809c58-ff5a-4f54-a813-9b42b18364fe`
		const response = await axios.post(`http://3.142.49.13:8080/building/exterior`, {
			building_id: buildings.id,
			photo_url: imageFromFirebase,
			description : descriptionExterior
		},{ headers: {"Authorization" : `Bearer ${user.token}`} }).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success create exterior photo")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
		setSelectedExteriorImage(null)
		setDescriptionExterior('')
	}

	const handleCreateInterior = async () => {
		const thisId = uuidv4();
		let reqFirebase = `/images/unit/${unitOne.id}/interior/${thisId}`
		if(selectedInteriorImage == null)
			return alert('not image selected');
		storage.ref(reqFirebase).put(selectedInteriorImage)
			.on("state_changed" , alert("success upload image") , alert);
		let imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Funit%2F${unitOne?.id}%2Finterior%2F${thisId}?alt=media&token=62809c58-ff5a-4f54-a813-9b42b18364fe`
		const response = await axios.post(`http://3.142.49.13:8080/building/exterior`, {
			unit_id: unitOne.id,
			photo_url: imageFromFirebase,
			description : descriptionInterior
		},{ headers: {"Authorization" : `Bearer ${user.token}`} }).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success create interior photo")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
		setSelectedInteriorImage(null)
		setDescriptionInterior('')
	}
	const handleCreateFloor = async () => {
		const thisId = uuidv4();
		let reqFirebase = `/images/building/${buildings.id}/floor/${thisId}`
		if(selectedFloorImage == null)
			return alert('not image selected');
		storage.ref(reqFirebase).put(selectedFloorImage)
			.on("state_changed" , alert("success upload image") , alert);
		let imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Fbuilding%2F${buildings?.id}%2Ffloor%2F${thisId}?alt=media&token=62809c58-ff5a-4f54-a813-9b42b18364fe`
		const response = await axios.post(`http://3.142.49.13:8080/building/exterior`, {
			building_id: buildings.id,
			photo_url: imageFromFirebase,
			description : descriptionFloor
		},{ headers: {"Authorization" : `Bearer ${user.token}`} }).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success create interior photo")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
		setSelectedFloorImage(null)
		setDescriptionFloor('')
	}

	const handleGetBuildingFacilities = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/building/${buildings.id}/facility`)
		if (response.data?.data?.building_facilities === null) {
			return alert("Tidak ada fasilitas di building ini, harap tambahkan fasilitas")
		} else {
		 setBuildingFacilities(response.data?.data?.building_facilities)
			toggleShowFacilityOn()
		}
	}

	const handleGetUnitFacilities = async () => {
		const response = await axios.get(`http://3.142.49.13:8080/unit/${unitOne.id}/facility`)
		if (response.data?.data?.unit_facilities === null ) {
			return alert("Tidak ada fasilitas di unit ini, harap tambahkan fasilitas")
		} else {
		 setUnitFacilities(response.data?.data?.unit_facilities)
		toggleShowUnitFacilityOn()

		}


	}
	const handleAddFacility = () => {
		let thisAddId
		for (let i = 0; i < globalFacilities.length; i++) {
			if (addFacility === globalFacilities[i].name) {
				thisAddId = globalFacilities[i].id
			}
	}
		axios.post(`http://3.142.49.13:8080/building/facility`, null, { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${buildings.id}`, "facility_id":`${thisAddId}`} }).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success add facility")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			})
	handleGetBuildingFacilities()
		setAddFacility('')
	}

	const handleDeleteBuildingFacilities = (e) => {
		// console.log("deleted id", e.target.id);
		let deletedId = e.target.id;
		axios.delete(`http://3.142.49.13:8080/building/${buildings.id}/facility/${deletedId}`, { headers: {"Authorization" : `Bearer ${user.token}`}}).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success delete facility")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			})

		handleGetBuildingFacilities()

	}

	const handleAddUnitFacility = () => {
		let thisAddId
		for (let i = 0; i < globalFacilities.length; i++) {
			if (addFacilityUnit === globalFacilities[i].name) {
				thisAddId = globalFacilities[i].id
			}
		}
		axios.post(`http://3.142.49.13:8080/unit/facility`, null, { headers: {"Authorization" : `Bearer ${user.token}`}, params:{"building_id":`${unitOne.id}`, "facility_id":`${thisAddId}`} }).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success add facility")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			})
		handleGetUnitFacilities()
		setAddFacilityUnit('')

	}

	const handleDeleteUnitFacilities = (e) => {
		// console.log("deleted id", e.target.id);
		let deletedId = e.target.id;
		axios.delete(`http://3.142.49.13:8080/unit/${unitOne.id}/facility/${deletedId}`, { headers: {"Authorization" : `Bearer ${user.token}`}}).then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success delete facility")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			})

		handleGetUnitFacilities()
	}

	const handleUpdateUnit1 = () => {
		axios
			.put(
				`http://3.142.49.13:8080/unit`,
				{
					id: unitOne.id,
					description: unitOne.description,
				},
				{
					headers:  {"Authorization" : `Bearer ${user.token}`}
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
				alert("success update unit")
			})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateUnit2 = () => {
		axios
			.put(
				`http://3.142.49.13:8080/unit`,
				{
					id: unitOne.id,
	price: unitOne.price,
	},
		{
			headers:  {"Authorization" : `Bearer ${user.token}`}
		}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success update unit")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateUnit3 = () => {
		axios
			.put(
				`http://3.142.49.13:8080/unit`,
				{
					id: unitOne.id,
	total_unit: unitOne.total_unit,
	},
		{
			headers:  {"Authorization" : `Bearer ${user.token}`}
		}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success update unit")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}
	const handleUpdateUnit4 = () => {
		axios
			.put(
				`http://3.142.49.13:8080/unit`,
				{
					id: unitOne.id,
	remaining_unit: unitOne.remaining_unit,
	},
		{
			headers:  {"Authorization" : `Bearer ${user.token}`}
		}
	)
	.then(function (response) {
			console.log(response);
			setLoading(false);
			alert("success update unit")
		})
			.catch(function (error) {
				setError(error);
				setLoading(false);
			});
	}


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
													key={Math.random()}
													// selected={isItemSelected}
												>
													<TableCell
														component="th"
														id={labelId}
														scope="row"
														// padding="none"
													>
														{row.name}
													</TableCell>
													<TableCell align="right">{row.building_id}</TableCell>
													<TableCell align="right" className={row.unit_type}>{row.unit_type}</TableCell>
													<TableCell align="right" >{row.unit_id}</TableCell>
													<TableCell align="right">{row.total_unit}</TableCell>
													<TableCell align="right">{row.unit_remaining}</TableCell>
													<TableCell ><Button variant="outlined" onClick={()=>(handleEditClick())}	style={{color:'white', borderColor:'white'}}>Edit Building</Button></TableCell>
													<TableCell ><Button variant="outlined" onClick={(e)=>(handleEditUnitClick(e))} id={row.unit_id}	style={{color:'white', borderColor:'white'}}>Edit Unit</Button></TableCell>
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
										{/*<TableCell>{buildings.name}</TableCell>*/}
										{isEditBuildingName === true ?
											<TableCell>
											<input
												value={buildings.name}
												name="name"
												onChange={(e) => handleInputChange(e)}/>
										</TableCell>
											 : <TableCell>{buildings.name}</TableCell>}
										{isEditBuildingName === false ?
										<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuildingName}>Edit</Button></TableCell>
										<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell> </Fragment>
											:
										<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuildingName}>Cancel</Button></TableCell>
										<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuildingName(); handleUpdateBuildingName();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Building Photo</TableCell>
										{isEditBuilding2 === true ?
											<TableCell>
												<input
													accept="image/*"
													type="file"
													required
													id="select-image"
													style={{ display: 'none' }}
													onChange={e => setSelectedImage(e.target.files[0])}
												/>
												<label htmlFor="select-image">
													<Button variant="contained" color="primary" component="span" >
														{imageUrl === null ? (
															<>Insert Building Image</>
														) : <>Change Building Image</>}

													</Button>
												</label>
												{/*{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}*/}
												{selectedImage ? (
													<Box mt={2} textAlign="center">
														<img src={URL.createObjectURL(selectedImage)} alt={buildings.name} height="400px" width="300px"/>
													</Box>
												) : null }
											</TableCell>
											: <TableCell><img src={buildings.image_url} alt={buildings.name} height="400px" width="300px"/></TableCell>}
										{isEditBuilding2 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding2}>Edit</Button></TableCell>
											<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding2}>Cancel</Button></TableCell>
											<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() =>{handleEditBuilding2(); handleUpdateBuildingMainImage()}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Description</TableCell>
										{isEditBuilding3 === true ?
											<TableCell>
												<textarea
													value={buildings.description}
													name="description"
													rows="4"
													cols="80"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.description}</TableCell>}
										{isEditBuilding3 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding3}>Edit</Button></TableCell>
											<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding3}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding3(); handleUpdateBuildingDescription();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>

										<TableCell variant="head">Building Size</TableCell>
										{isEditBuilding4 === true ?
											<TableCell>
												<input
													value={buildings.building_size}
													name="building_size"
													type="number"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.building_size}</TableCell>}
										{isEditBuilding4 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding4}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding4}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding4(); handleUpdateBuildingSize();}}>Save</Button></TableCell></Fragment>}
									</TableRow>

									<TableRow>
										<TableCell variant="head">Average Floor Plate</TableCell>
										{isEditBuilding5 === true ?
											<TableCell>
												<input
													value={buildings.average_floor_size}
													name="average_floor_size"
													type="number"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.average_floor_size}</TableCell>}
										{isEditBuilding5 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding5}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding5}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding5(); handleUpdateBuildingAvrgFloor();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Office Hours</TableCell>
										{isEditBuilding6 === true ?
											<TableCell>
												<input
													value={buildings.office_hours}
													name="office_hours"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.office_hours}</TableCell>}
										{isEditBuilding6 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding6}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding6}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding6(); handleUpdateBuildingOfficeHours();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Parking</TableCell>
										{isEditBuilding7 === true ?
											<TableCell>
												<input
													value={buildings.parking}
													name="parking"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.parking}</TableCell>}
										{isEditBuilding7 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding7}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding7}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding7(); handleUpdateBuildingParking();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Toilets</TableCell>
										{isEditBuilding8 === true ?
											<TableCell>
												<input
													value={buildings.toilets}
													name="toilets"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.toilets}</TableCell>}
										{isEditBuilding8 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding8}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding8}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding8(); handleUpdateBuildingToilets();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Lifts</TableCell>
										{isEditBuilding9 === true ?
											<TableCell>
												<input
													value={buildings.lifts}
													name="lifts"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.lifts}</TableCell>}
										{isEditBuilding9 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding9}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding9}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding9(); handleUpdateBuildingLifts();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Year Constructed</TableCell>
										{isEditBuilding10 === true ?
											<TableCell>
												<input
													value={buildings.year_constructed}
													name="year_constructed"
													onChange={(e) => handleInputChange(e)}/>
											</TableCell>
											: <TableCell>{buildings.year_constructed}</TableCell>}
										{isEditBuilding10 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding10}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshData}>Refresh</Button></TableCell></Fragment>:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEditBuilding10}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEditBuilding10(); handleUpdateBuildingYearConstruct();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Exterior Photos</TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleGetExteriorPhoto();handleOpen()}}>Detail Photo</Button></TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleAddPhoto()}}>Add Photo</Button></TableCell>
										<TableCell ></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Floor Photos</TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleGetFloorPhoto();handleOpenFloor()}}>Detail Photo</Button></TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleAddFloorPhoto()}}>Add Photo</Button></TableCell>
										<TableCell ></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Facilities</TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={handleGetBuildingFacilities}>Show Facilities</Button></TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={handleShowAddFacility}>Add Facilities</Button></TableCell>
										<TableCell ></TableCell>
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
			{
				isAddFacilityOn ? <Paper><Box textAlign="center" display="flex" flexDirection="column" justifyContent="center"
									alignItems="center" py={3}>
					<Autocomplete
						margin="normal"
						color="black"
						autoHighlight
						fullWidth
						required
						freeSolo

						autoFocus
						id="free-solo-2-demo"
						disableClearable
						sx={{width: '30%', color: 'white'}}
						options={globalFacilities.map((option) => option.name)}
						renderInput={(params) => (
							<TextField
								// onClick={e => loadComplexes()}
								onSelect={e => setAddFacility(e.target.value)}
								{...params}
								value={addFacility}
								label="Search facility"
								InputProps={{
									...params.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>
					<Button variant="outlined"
							style={{color: 'white', borderColor: 'white', marginTop: '10px', width: "30%"}}
							onClick={handleAddFacility}>Add Facility</Button></Box></Paper>  : null }

			{isFacilityOn ? <div style={{marginTop: "3%", width: "90%", marginRight: "5%"}}>
				<Box sx={{width: '100%'}}>

					<Paper sx={{width: '100%', mb: 2}}>
						<Box textAlign="center" display="flex" flexDirection="column" justifyContent="center"
							 alignItems="center" pt={3}>
							<Autocomplete
								margin="normal"
								color="black"
								autoHighlight
								fullWidth
								required
								freeSolo

								autoFocus
								id="free-solo-2-demo"
								disableClearable
								sx={{width: '30%', color: 'white'}}
								options={globalFacilities.map((option) => option.name)}
								renderInput={(params) => (
									<TextField
										// onClick={e => loadComplexes()}
										onSelect={e => setAddFacility(e.target.value)}
										{...params}
										value={addFacility}
										label="Search facility"
										InputProps={{
											...params.InputProps,
											type: 'search',
										}}
									/>
								)}
							/>
							<Button variant="outlined"
									style={{color: 'white', borderColor: 'white', marginTop: '10px', width: "30%"}}
									onClick={handleAddFacility}>Add Facility</Button></Box>
						<TableContainer>

							<Table sx={{minWidth: 750}}
								   aria-labelledby="tableTitle"
								   size={dense ? 'small' : 'medium'}>
								<TableHead>
									<TableRow>
										<TableCell align="center">Facility</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{buildingFacilities.map((row) => (
										<TableRow key={row.id}>
											<TableCell align="center" component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="center"><Button variant="outlined" style={{
												color: 'white',
												borderColor: 'white'
											}} id={row.id} onClick={(e) => handleDeleteBuildingFacilities(e)}>Delete
												Facility</Button></TableCell>
										</TableRow>
									))}

								</TableBody>
							</Table>
						</TableContainer>

					</Paper>
					<FormControlLabel
						control={<Switch checked={dense} onChange={handleChangeDense}/>}
						label="Dense padding"
					/>
				</Box>
			</div> : null}
			{isExteriorOn ? <ModalPhoto open={open} exterior={exterior} setExterior={setExterior} building={buildings} handleClose={handleClose}/> : null}
			{isAddOn? <Box display='flex' mb={10}>

						<input
							accept="image/*"
							type="file"
							required
							id="select-image"
							style={{ display: 'none' }}
							onChange={e => setSelectedExteriorImage(e.target.files[0])}
						/>
						<label htmlFor="select-image">
							<Button variant="contained" color="primary" component="span" >
							Add or Change Image
							</Button>
						</label>
						{/*{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}*/}
						{selectedExteriorImage ? (
							<Box mt={2} textAlign="center">
								<img src={URL.createObjectURL(selectedExteriorImage)} alt="added exterior image" height="400px" width="400px"/>
							</Box>
						) : null }
				<textarea
					value={descriptionExterior}
					name="description"
					required
					rows="2"
					placeholder="Fill description for photo"
					cols="50"
					onChange={(e) => setDescriptionExterior(e.target.value)}/>
					<Box>
						<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={handleCloseExterior}>Cancel</Button>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=>handleCreateExterior()}>Save</Button></Box>
			</Box>: null}
			{isAddFloor ? <Box display='flex' mb={10}>

				<input
					accept="image/*"
					type="file"
					required
					id="select-image"
					style={{ display: 'none' }}
					onChange={e => setSelectedFloorImage(e.target.files[0])}
				/>
				<label htmlFor="select-image">
					<Button variant="contained" color="primary" component="span" >
						Add or Change Image
					</Button>
				</label>
				{/*{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}*/}
				{selectedFloorImage ? (
					<Box mt={2} textAlign="center">
						<img src={URL.createObjectURL(selectedFloorImage)} alt="added exterior image" height="400px" width="400px"/>
					</Box>
				) : null }
				<TextField
					value={descriptionFloor}
					name="description"
					required
					multiline
					rows={4}
					placeholder="Fill description for photo"
					onChange={(e) => setDescriptionFloor(e.target.value)}/>
				<Box>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={handleCloseFloor}>Cancel</Button>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=>handleCreateFloor()}>Save</Button></Box>
			</Box>: null}
			{isOnUnit ?
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
										<TableCell variant="head">Unit Type</TableCell>
										<TableCell>{unitOne.unit_type}</TableCell>
										<TableCell ><Button variant="outlined"	style={{color:'white', borderColor:'white'}}>Edit</Button></TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Description</TableCell>
										{isEdit1 === true ?
											<TableCell>
												<TextField id="outlined-basic" multiline rows={4}  onChange={(e)=> handleInputUnitChange(e)} label="Description" variant="outlined" name="description" value={unitOne.description}/>
											</TableCell>
											: <TableCell>{unitOne.description}</TableCell>}
										{isEdit1 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshDataUnit}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit1}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit1(); handleUpdateUnit1();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Price per Unit</TableCell>
										{isEdit2 === true ?
											<TableCell>
												<TextField id="outlined-basic" type="number" onChange={(e)=> handleInputUnitChange(e)} label="Price" variant="outlined" name="price" value={unitOne.price}/>
											</TableCell>
											: <TableCell>{unitOne.price}</TableCell>}
										{isEdit2 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshDataUnit}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit2}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit2(); handleUpdateUnit2();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Total Unit</TableCell>
										{isEdit3 === true ?
											<TableCell>
												<TextField id="outlined-basic" type="number" onChange={(e)=> handleInputUnitChange(e)} label="Total Unit" variant="outlined" name="total_unit" value={unitOne.total_unit}/>
											</TableCell>
											: <TableCell>{unitOne.total_unit}</TableCell>}
										{isEdit3 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshDataUnit}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit3}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit3(); handleUpdateUnit3();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Remaining Unit</TableCell>
										{isEdit4 === true ?
											<TableCell>
												<TextField id="outlined-basic" type="number" onChange={(e)=> handleInputUnitChange(e)} label="Remaining Unit" variant="outlined" name="remaining_unit" value={unitOne.remaining_unit}/>
											</TableCell>
											: <TableCell>{unitOne.remaining_unit}</TableCell>}
										{isEdit4 === false ?
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Edit</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleRefreshDataUnit}>Refresh</Button></TableCell> </Fragment>
											:
											<Fragment><TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={handleEdit4}>Cancel</Button></TableCell>
												<TableCell ><Button variant="outlined" 	style={{color:'white', borderColor:'white'}} onClick={() => { handleEdit4(); handleUpdateUnit4();}}>Save</Button></TableCell></Fragment>}
									</TableRow>
									<TableRow>
										<TableCell variant="head">Interior Photos</TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleGetInteriorPhoto();handleOpenInterior()}}>Detail Photo</Button></TableCell>
										<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={() => {handleAddInteriorPhoto()}}>Add Photo</Button></TableCell>
										<TableCell ></TableCell>
									</TableRow>
										<TableRow>
											<TableCell variant="head">Facilities</TableCell>
											<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={handleGetUnitFacilities}>Show Facilities</Button></TableCell>
											<TableCell><Button variant="outlined"	style={{color:'white', borderColor:'white'}} onClick={handleShowAddUnitFacility}>Add Facilities</Button></TableCell>
											<TableCell ></TableCell>
										</TableRow>
								</Table>
							</TableContainer>
						</Paper>
						<FormControlLabel
							control={<Switch checked={dense} onChange={handleChangeDense} />}
							label="Dense padding"
						/>

					</Box>)
				</div> ): null}
			{isInteriorOn ? <ModalPhotoInterior open={openInterior} interior={interior} setInterior={setInterior} unit={unitOne} handleClose={handleCloseInteriorModal}/> : null}
			{isFloorOn ? <ModalPhotoFloor open={openFloor} floor={floor} setFloor={setFloor} unit={buildings} handleClose={handleCloseFloorModal}/> : null}
			{isAddInterior ? <Box display='flex' mb={10}>

				<input
					accept="image/*"
					type="file"
					required
					id="select-image"
					style={{ display: 'none' }}
					onChange={e => setSelectedInteriorImage(e.target.files[0])}
				/>
				<label htmlFor="select-image">
					<Button variant="contained" color="primary" component="span" >
						Add or Change Image
					</Button>
				</label>
				{/*{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}*/}
				{selectedInteriorImage ? (
					<Box mt={2} textAlign="center">
						<img src={URL.createObjectURL(selectedInteriorImage)} alt="added exterior image" height="400px" width="400px"/>
					</Box>
				) : null }
				<TextField
					value={descriptionInterior}
					name="description"
					required
					multiline
					rows={4}
					placeholder="Fill description for photo"
					onChange={(e) => setDescriptionInterior(e.target.value)}/>
				<Box>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={handleCloseInterior}>Cancel</Button>
					<Button variant="outlined" 	style={{color:'black', borderColor:'white'}} onClick={()=>handleCreateInterior()}>Save</Button></Box>
			</Box>: null}

			{
				isAddUnitFacilityOn ? <Paper><Box textAlign="center" display="flex" flexDirection="column" justifyContent="center"
												  alignItems="center" py={3}>
					<Autocomplete
						margin="normal"
						color="black"
						autoHighlight
						fullWidth
						required
						freeSolo

						autoFocus
						id="free-solo-2-demo"
						disableClearable
						sx={{width: '30%', color: 'white'}}
						options={globalFacilities.map((option) => option.name)}
						renderInput={(params) => (
							<TextField
								// onClick={e => loadComplexes()}
								onSelect={e => setAddFacilityUnit(e.target.value)}
								{...params}
								value={addFacilityUnit}
								label="Search facility"
								InputProps={{
									...params.InputProps,
									type: 'search',
								}}
							/>
						)}
					/>
					<Button variant="outlined"
							style={{color: 'white', borderColor: 'white', marginTop: '10px', width: "30%"}}
							onClick={handleAddUnitFacility}>Add Facility</Button></Box></Paper>  : null }

			{isUnitFacilityOn ? <div style={{marginTop: "3%", width: "90%", marginRight: "5%"}}>
				<Box sx={{width: '100%'}}>

					<Paper sx={{width: '100%', mb: 2}}>
						<Box textAlign="center" display="flex" flexDirection="column" justifyContent="center"
							 alignItems="center" pt={3}>
							<Autocomplete
								margin="normal"
								color="black"
								autoHighlight
								fullWidth
								required
								freeSolo

								autoFocus
								id="free-solo-2-demo"
								disableClearable
								sx={{width: '30%', color: 'white'}}
								options={globalFacilities.map((option) => option.name)}
								renderInput={(params) => (
									<TextField
										// onClick={e => loadComplexes()}
										onSelect={e => setAddFacilityUnit(e.target.value)}
										{...params}
										value={addFacility}
										label="Search facility"
										InputProps={{
											...params.InputProps,
											type: 'search',
										}}
									/>
								)}
							/>
							<Button variant="outlined"
									style={{color: 'white', borderColor: 'white', marginTop: '10px', width: "30%"}}
									onClick={handleAddUnitFacility}>Add Facility</Button></Box>
						<TableContainer>

							<Table sx={{minWidth: 750}}
								   aria-labelledby="tableTitle"
								   size={dense ? 'small' : 'medium'}>
								<TableHead>
									<TableRow>
										<TableCell align="center">Facility</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{unitFacilities.map((row) => (
										<TableRow key={row.id}>
											<TableCell align="center" component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="center"><Button variant="outlined" style={{
												color: 'white',
												borderColor: 'white'
											}} id={row.id} onClick={(e) => handleDeleteUnitFacilities(e)}>Delete
												Facility</Button></TableCell>
										</TableRow>
									))}

								</TableBody>
							</Table>
						</TableContainer>

					</Paper>
					<FormControlLabel
						control={<Switch checked={dense} onChange={handleChangeDense}/>}
						label="Dense padding"
					/>
				</Box>
			</div> : null}
		</div>
	)
}