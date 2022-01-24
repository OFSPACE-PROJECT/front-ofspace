import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Autocomplete, Container, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import {makeStyles} from "@mui/styles";
import React, {useEffect, useReducer, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import useToggle from "../../costumHooks/useToggle";
import Box from "@mui/material/Box";
import storage from "../../services/firebase"
import RemoveIcon from '@mui/icons-material/Remove';
import PreviewIcon from '@mui/icons-material/Preview';
import axios from "axios";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
	btn : {
		fontSize : 30,
		backgroundColor : "violet",
		'&:hover': {
			backgroundColor :"blue"
		}
	},
	title : {
		textDecoration : "underline",
		marginBottom: 10
	},
	field : {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',

	}
	}
)




const initialFormValues = {
	buildingName : '',
	sizeBuilding : '',
	averageFloorSize: '',
	yearConstructed : '',
	description: '',
	address: '',
	officeHours: '',
	toilets: '',
	parking: '',
	lifts: '',
	floorCount: '',
}


const formReducer = (state, action) => {
	switch (action.type) {
		case 'update':
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}

};



const RegisterBuilding = ({name}) => {
	const classes = useStyles()
	// const [complexes, setComplexes] = useState('')
	const [error1, setError] = useState(false)
	const [isOn, toggleIsOn] = useToggle();
	const [imageOn, toggleImageOn] = useToggle();
	const [state, dispatch] = useReducer(formReducer, initialFormValues);
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [complexes, setComplexes] = useState([]);
	const [complexId, setComplexId] = useState('');
	const [text, setText] = useState('')
	const [linkImage, setLinkImage] = useState('')
	const user = useSelector((state) => state.persistedReducer.user);
	const [loading, setLoading] = useState(false);

	const loadComplexes = async () => {
		const response = await axios.get('http://3.142.49.13:8080/complex',{
			headers: { accept: "*/*", "Content-Type": "application/json" },
		});
		console.log("this resp", response.data.data);
		setComplexes(response.data.data);
	}

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const onChangeComplexes = (e) => {
		console.log("onChangeComplexes", e.target.value)
		for (let i = 0; i < complexes.length; i++) {
			if (e.target.value === complexes[i].name) {
				setText(complexes[i].latitude)
				setComplexId(complexes[i].id)
			}
	}}

	let reqFirebase = `/images/building/${state.buildingName}`
	const getLinkImage = async () => {
		let downloadURLKu = await storage.ref(reqFirebase).getDownloadURL()
		setLinkImage(downloadURLKu)
		console.log(downloadURLKu)
	}
	const uploadImageFirebase = ()=> {
		if(selectedImage == null)
			return;
		 storage.ref(reqFirebase).put(selectedImage)
			.on("state_changed" , alert("success upload image") , alert);
	}
	const inputAction = (event) => {
		dispatch({
			type: 'update',
			payload: { key: event.target.name, value: event.target.value },
		});


	};

	const imageFromFirebase = `https://firebasestorage.googleapis.com/v0/b/ofspace-project.appspot.com/o/images%2Fbuilding%2F${state.buildingName}?alt=media&token=42b2f2ca-e913-4fe4-82ff-9b2fdc68a037`
	const createBuildingHandler = (e) => {
		e.preventDefault();
		setError(false)
		if (complexes==='' && linkImage === '' && state.buildingName==='' && state.sizeBuilding === '' && state.averageFloorSize === '' && state.lifts === '' && state.toilets === '' && state.yearConstructed === '' && state.officeHours === '' && state.description === '' && state.parking === '' && state.floorCount === '' ){
			setError(true)
		}
		uploadImageFirebase()
		setLoading(true);
		axios
			.post(
				`http://3.142.49.13:8080/building`,
				{
						user_id: user.id,
						name: state.buildingName,
						complex_id: complexId,
						description: state.description,
						building_size: state.sizeBuilding,
						average_floor_size: state.averageFloorSize,
						office_hours: state.officeHours,
						year_constructed: state.yearConstructed,
						lifts: state.lifts,
						toilets: state.toilets,
						parking: state.parking,
						image_url: imageFromFirebase,
				}
			)
			.then(function (response) {
				console.log(response);
				setLoading(false);
			})
			.catch(function (error) {
				console.log("error post", error);
				setError(error);
				setLoading(false);
			});
		alert("success post")
	};
	const handleSubmit = (e) => {
		e.preventDefault()


	}
	const fileInput = () => {
		return <input accept="image/*" type="file" id="select-image" />;
	};

	return (
		<Container
			sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			color: "white",
			width: 1100,
			backgroundColor: "#212121",
			borderRadius: "15px",
			padding: "20px",
			mt: 2,
		}}>
	<Typography variant="subtitle1" color="white" sx={{mb:2}}>
		Property Details
	</Typography>
			<form onSubmit={createBuildingHandler} className={classes.field}>
				<Autocomplete
					margin="normal"
					color="outline"
					autoHighlight
					fullWidth
					required
					freeSolo
					autoFocus
					id="free-solo-2-demo"
					disableClearable
					options={complexes.map((option) => option.name)}
					renderInput={(params) => (
						<TextField
							onClick={e => loadComplexes()}
							onSelect={e => onChangeComplexes(e)}
							{...params}
							label="Search input"
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
				/>
				<TextField
					margin="normal"
					fullWidth
					id="location"
					label="Location"
					disabled={true}
					name="location"
					color="outline"
					variant="outlined"
					value={text}
				/>
			<Button variant="contained" endIcon={!isOn ? <AddIcon fontSize="small" /> : <RemoveIcon fontSize="small"/>} onClick={toggleIsOn}>Add Building </Button>
				{isOn ?
					<>
						<Typography variant="subtitle1" mt={2} gutterBottom color="white">
							Building Details:
						</Typography>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="buildingName"
							value={state.buildingName}
							onChange={inputAction}
							label="Building Name"
							error={error1}
							color="outline"
							autoFocus
						/>
						<input
							accept="image/*"
							type="file"
							required
							id="select-image"
							style={{ display: 'none' }}
							onChange={e => setSelectedImage(e.target.files[0])}
						/>
						<label htmlFor="select-image">
							<Button variant="contained" color="primary" component="span" endIcon={<AddIcon fontSize="small" />} >
								{imageUrl === null ? (
									<>Insert Building Image</>
								) : <>Change Building Image</>}

							</Button>
						</label>
						{/*{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}*/}
						{imageUrl && selectedImage ? (
							<Box mt={2} textAlign="center">
								<img src={imageUrl} alt={selectedImage.name} height="400px" width="300px"/>
							</Box>
						) : null }

							{/*{selectedImage !== null ? (*/}
							{/*		<Button variant="contained" className={classes.btn} endIcon={<AddIcon fontSize="small" />} onClick={uploadAndGetImageFirebase}>Upload This Image</Button>*/}
							{/*) : null}*/}


						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="description"
							value={state.description}
							onChange={inputAction}
							label="Description "
							error={error1}
							color="outline"
							multiline
							rows="5"
						/>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="address"
							value={state.address}
							onChange={inputAction}
							label="Building Address"
							error={error1}
							color="outline"
							multiline
							rows="3"
						/>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="officeHours"
							value={state.officeHours}
							onChange={inputAction}
							label="Office Hours"
							error={error1}
							color="outline"
							multiline
							rows="3"
						/>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="toilets"
							value={state.toilets}
							onChange={inputAction}
							label="Toilets Capacity"
							error={error1}
							color="outline"
							multiline
							rows="2"
						/>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="parking"
							value={state.parking}
							onChange={inputAction}
							label="Parking Price"
							error={error1}
							color="outline"
							multiline
							rows="2"
						/>
						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="lifts"
							value={state.lifts}
							onChange={inputAction}
							label="Lifts Capacity"
							error={error1}
							color="outline"
							multiline
							rows="2"
						/>
						<Box>
						<TextField
							label="Building Size"
							id="outlined-start-adornment"
							sx={{ m: 1, width: '25ch' }}
							value={state.sizeBuilding}
							name="sizeBuilding"
							color="outline"
							InputProps={{
								endAdornment: <InputAdornment  position="end">m {"\u00B2"}</InputAdornment>,
							}}
							onChange={inputAction}
							type="number"
						/>
						<TextField
							label="Average Floor Size"
							id="outlined-start-adornment"
							sx={{ m: 1, width: '25ch' }}
							value={state.averageFloorSize}
							name="averageFloorSize"
							color="outline"
							InputProps={{
								endAdornment: <InputAdornment  position="end">m {"\u00B2"}</InputAdornment>,
							}}
							onChange={inputAction}
							type="number"
						/>
						<TextField
							label="Year Constructed"
							// id="outlined-start-adornment"
							sx={{ m: 1, width: '25ch' }}
							value={state.yearConstructed}
							name="yearConstructed"
							color="outline"
							onChange={inputAction}
							format="DD-MM-YYYY"
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							label="Floor Count"
							id="outlined-start-adornment"
							sx={{ m: 1, width: '25ch' }}
							value={state.floorCount}
							name="floorCount"
							color="outline"
							onChange={inputAction}
							type="number"
						/>
						</Box>
					</>

					: null }

			<Button size="large" variant="contained" sx={{ m: 1}} color="secondary" type="submit" endIcon={<SendIcon fontSize="small"/>}>Submit</Button>
			</form>
		</Container>)
}

export default RegisterBuilding
