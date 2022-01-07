import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, InputAdornment} from "@mui/material";
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
	sizeBuilding : 0,
	averageFloorSize: 0,
	yearConstructed : null,
	description: '',
	address: '',
	// office hours and toilets move to unit type that can be updated after admin verification
	// officeHours: {"Mon - Fri": null, "Sat" : null, "Sun" : null},
	// toilets: {"Male Urinal": 0, "Male Cubical" : 0, "Female Cubical" : 0},
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
	const [complex, setComplex] = useState('')
	const [error1, setError] = useState(false)
	const [category, setCategory] = useState("dua")
	const [isOn, toggleIsOn] = useToggle();
	const [imageOn, toggleImageOn] = useToggle();
	const [state, dispatch] = useReducer(formReducer, initialFormValues);
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const upload = ()=> {
		if(selectedImage == null)
			return;
		storage.ref(`/images/${selectedImage.name}`).put(selectedImage)
			.on("state_changed" , alert("success") , alert);
	}
	const inputAction = (event) => {
		dispatch({
			type: 'update',
			payload: { key: event.target.name, value: event.target.value },
		});
		console.log("tst", state.buildingName)
	};
	// 	let path = 'images/Screenshot from 2021-12-30 05-25-48.png'
	// const checkDownload = async () => {
	// 	let downloadURLKu = await storage.ref(path).getDownloadURL()
	// 	console.log("link", downloadURLKu)
	// }
	// const downloadImage = async () => {
	// 	await storage.ref(path).getDownloadURL().then(function (url) {
	// 		let link = document.createElement("a");
	// 		if (link.download !== undefined) {
	// 			link.setAttribute("href", url);
	// 			link.setAttribute("target", "_blank");
	// 			link.style.visibility = 'hidden';
	// 			document.body.appendChild(link);
	// 			link.click();
	// 			document.body.removeChild(link);
	// 		}
	// 	})}
	console.log("getname", name)
	const handleSubmit = (e) => {
		e.preventDefault()
		setError(false)
		if (complex===''){
			setError(true)
		}
		if (complex) {
			console.log(complex, category, state.description)
		}
	}
	const fileInput = () => {
		return <input accept="image/*" type="file" id="select-image" />;
	};

	return (
		<Container>
	<Typography variant="subtitle1" color="white" mb={-4}>
		Property Details
	</Typography>

			<form noValidate onSubmit={handleSubmit} className={classes.field}>
				<TextField
					margin="normal"
					fullWidth
					required
					onChange={(e) => setComplex(e.target.value)}
					value={complex}
					label="Complex Name or Location"
					error={error1}
					color="outline"
					autoFocus

				/>
				<TextField
					margin="normal"
					fullWidth
					id="location"
					label="Location (Autogenerate)"
					disabled={true}
					name="location"
					color="outline"
					variant="outlined"
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
						{selectedImage? <Button variant="contained" endIcon={<PreviewIcon fontSize="small" />} onClick={toggleImageOn}>Preview</Button> : null}
						{/*<Button variant="contained" endIcon={<AddIcon fontSize="small" />} onClick={downloadImage}>Download Image</Button>*/}
						{/*<Button variant="contained" endIcon={<AddIcon fontSize="small" />} onClick={checkDownload}>Check Image </Button>*/}
						{imageOn ? imageUrl && selectedImage && (
							<Box mt={2} textAlign="center">
								<Typography >Image Preview:</Typography>
								<img src={imageUrl} alt={selectedImage.name} height="400px" width="300px"/>
							</Box>
						) : null }

							{/*{selectedImage !== null ? (*/}
							{/*		<Button variant="contained" className={classes.btn} endIcon={<AddIcon fontSize="small" />} onClick={upload}>Upload This Image</Button>*/}
							{/*) : null}*/}


						<TextField
							margin="normal"
							fullWidth
							required
							type="text"
							name="description"
							value={state.description}
							onChange={inputAction}
							label="Description"
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
							rows="5"
						/>
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
					</>

					: null }
			<Button size="large" variant="contained" sx={{ m: 1}} color="secondary" type="submit" endIcon={<SendIcon fontSize="small"/>}>Submit</Button>
			</form>
		</Container>)
}

export default RegisterBuilding
